import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_FOOTBALL_KEY;

if (!API_KEY) {
  console.error('ERROR: API_FOOTBALL_KEY environment variable is required');
  process.exit(1);
}

const cache = new Map();
const LIVE_CACHE_TTL = 30 * 1000;
const DATE_CACHE_TTL = 5 * 60 * 1000;

app.get('/api/fixtures', async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required (format: YYYY-MM-DD)' });
    }

    const cacheKey = `fixtures-${date}`;
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < DATE_CACHE_TTL) {
      return res.json({
        ...cached.data,
        cached: true,
        lastUpdated: new Date(cached.timestamp).toISOString()
      });
    }

    const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
      params: { date },
      headers: {
        'x-apisports-key': API_KEY
      }
    });

    if (!response.data || !Array.isArray(response.data.response)) {
      throw new Error('Invalid API response format');
    }

    const fixtures = response.data.response.map(fixture => ({
      id: fixture.fixture.id,
      date: fixture.fixture.date,
      status: fixture.fixture.status.short,
      elapsed: fixture.fixture.status.elapsed,
      league: {
        id: fixture.league.id,
        name: fixture.league.name,
        country: fixture.league.country
      },
      homeTeam: {
        id: fixture.teams.home.id,
        name: fixture.teams.home.name,
        logo: fixture.teams.home.logo
      },
      awayTeam: {
        id: fixture.teams.away.id,
        name: fixture.teams.away.name,
        logo: fixture.teams.away.logo
      },
      score: {
        home: fixture.goals.home,
        away: fixture.goals.away
      }
    }));

    const data = {
      fixtures,
      lastUpdated: new Date().toISOString()
    };

    cache.set(cacheKey, {
      timestamp: Date.now(),
      data
    });

    res.json(data);
  } catch (error) {
    console.error('API Error:', error.message);
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'API request failed',
        status: error.response.status,
        message: error.response.data?.message || 'Unknown error'
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/fixtures/live', async (req, res) => {
  try {
    const cacheKey = 'fixtures-live';
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < LIVE_CACHE_TTL) {
      return res.json({
        ...cached.data,
        cached: true,
        lastUpdated: new Date(cached.timestamp).toISOString()
      });
    }

    const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
      params: { live: 'all' },
      headers: {
        'x-apisports-key': API_KEY
      }
    });

    if (!response.data || !Array.isArray(response.data.response)) {
      throw new Error('Invalid API response format');
    }

    const fixtures = response.data.response.map(fixture => ({
      id: fixture.fixture.id,
      date: fixture.fixture.date,
      status: fixture.fixture.status.short,
      elapsed: fixture.fixture.status.elapsed,
      league: {
        id: fixture.league.id,
        name: fixture.league.name,
        country: fixture.league.country
      },
      homeTeam: {
        id: fixture.teams.home.id,
        name: fixture.teams.home.name,
        logo: fixture.teams.home.logo
      },
      awayTeam: {
        id: fixture.teams.away.id,
        name: fixture.teams.away.name,
        logo: fixture.teams.away.logo
      },
      score: {
        home: fixture.goals.home,
        away: fixture.goals.away
      }
    }));

    const data = {
      fixtures,
      lastUpdated: new Date().toISOString()
    };

    cache.set(cacheKey, {
      timestamp: Date.now(),
      data
    });

    res.json(data);
  } catch (error) {
    console.error('API Error:', error.message);
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'API request failed',
        status: error.response.status,
        message: error.response.data?.message || 'Unknown error'
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
