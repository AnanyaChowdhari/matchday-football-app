# API-Football Integration

## Setup Instructions

### 1. Get Your API Key
- Sign up at [API-Football](https://www.api-football.com/)
- Get your free API key (100 requests/day on free tier)

### 2. Configure Environment Variables
- Copy `.env.example` to `.env` in the project root:
  ```bash
  cp .env.example .env
  ```
- Open `.env` and replace the placeholder with your actual API key:
  ```
  API_FOOTBALL_KEY=your_actual_api_key_here
  ```
- **Never commit `.env` to git** - it's already in `.gitignore`

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Application

**Option A: Run both frontend and backend together**
```bash
npm run dev:full
```
This starts:
- Frontend on port 8443 (or your configured Vite port)
- Backend proxy on port 3001

**Option B: Run individually**
```bash
# Terminal 1 - Frontend only
npm run dev

# Terminal 2 - Backend only
npm run server
```

## API Endpoints

- `GET http://localhost:3001/api/fixtures?date=YYYY-MM-DD`
  - Returns fixtures for the specified date
  - 5-minute server-side cache to conserve free tier quota
  - Response includes: team names, logos, scores, kickoff times, match status, league info, lastUpdated timestamp

- `GET http://localhost:3001/api/fixtures/live`
  - Returns all currently live matches across all leagues
  - 30-second server-side cache
  - Used for real-time score updates

## Live Data Refresh Rate - Critical Information

### Free Tier Limitations
The **free tier cannot support genuine real-time live updates**:

- **100 requests per day quota**
- **10 requests per minute rate limit**
- API-Football updates data every 15 seconds on their end
- To poll every 60 seconds for 24 hours = 1,440 requests/day (exceeds free tier)
- Even polling only during 8-hour match windows = 480-960 requests/day (exceeds free tier)

### Current Implementation
- **Free tier:** Polls every 5 minutes when viewing today's fixtures
- Data freshness is clearly labeled with timestamp
- Not labeled as "real-time" - accurately reflects delayed updates
- Polling automatically stops when navigating away from today's date or unmounting components

### For Real-Time Updates (30-60 second polling)
**Minimum required plan: Pro ($19/month)**
- 7,500 requests/day, 300 requests/minute (5 requests/second)
- Allows polling every 30-60 seconds during match windows
- Provides genuinely live score updates

To upgrade:
1. Go to [API-Football pricing](https://www.api-football.com/pricing)
2. Subscribe to Pro plan or higher
3. Update polling interval in `src/App.tsx` (currently set to `5 * 60 * 1000` ms)

## Free Tier Limitations

- **100 requests per day** - backend caching helps conserve quota
- **10 requests per minute** rate limit
- Live data refresh limited to 5-minute intervals on free tier
- Limited historical data access
- Lineups and detailed statistics require paid tier
- Rate limiting applies

## Troubleshooting

- If fixtures don't load, ensure the backend is running on port 3001
- Check that `.env` file exists and contains a valid API key
- Verify you haven't exceeded the 100 request/day limit
- The backend logs errors to console for debugging
- If you see rate limit errors, wait until the next day for quota reset
