# Matchday - Football App Setup

## Quick Start

1. **Get API Key**: Sign up at [API-Football](https://www.api-football.com/) for a free API key

2. **Configure Environment**:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your key:
   ```
   API_FOOTBALL_KEY=your_actual_key_here
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Development**:
   ```bash
   npm run dev:full
   ```
   This starts both the frontend (port 8443) and backend proxy (port 3001)

## Running Separately

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server
```

## Important Notes

- **Never commit `.env` to git** - it contains your private API key
- The backend proxy protects your API key by keeping it server-side
- Free tier: 100 requests/day - backend uses 5-minute caching to conserve quota
- **Live data refresh is limited to 5 minutes on free tier** - not real-time
- For genuine real-time updates (30-60 second polling), Pro plan ($19/month) is required
- Open http://localhost:8443 to view the app

For more details, see [server/README.md](server/README.md)
