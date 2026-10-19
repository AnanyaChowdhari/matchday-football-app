import { useState, useEffect as ReactUseEffect, type ReactNode } from "react";

type Tab = "home" | "matches" | "discover" | "profile";

const crest = {
  arsenal: "https://crests.football-data.org/57.png",
  city: "https://crests.football-data.org/65.png",
  united: "https://crests.football-data.org/66.png",
  chelsea: "https://crests.football-data.org/61.png",
  liverpool: "https://crests.football-data.org/64.png",
  villa: "https://crests.football-data.org/58.png",
  real: "https://crests.football-data.org/86.png",
  barca: "https://crests.football-data.org/81.png",
  inter: "https://crests.football-data.org/108.png",
};

const stadiumPhoto =
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=85";
const matchPhoto =
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=900&q=85";
const crowdPhoto =
  "https://images.unsplash.com/photo-1599158150601-1417ebbaafdd?auto=format&fit=crop&w=900&q=85";
const nightMatchPhoto =
  "https://images.unsplash.com/photo-1706675780107-7c43cc487928?auto=format&fit=crop&w=900&q=85";
const floodlightsPhoto =
  "https://images.unsplash.com/photo-1679391029864-d46f366a456b?auto=format&fit=crop&w=900&q=85";

function Icon({
  name,
  size = 20,
}: {
  name: string;
  size?: number;
}) {
  const paths: Record<string, ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9M9 20v-6h6v6" />
      </>
    ),
    ball: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m12 8 3 2-1 4h-4l-1-4 3-2ZM12 3v5M3.5 9l5.5 1M5 18l5-4M19 18l-5-4M20.5 9 15 10" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6-5.4-2.9-5.4 2.9 1-6-4.4-4.3 6.1-.9L12 3Z" />,
    arrow: <path d="m9 18 6-6-6-6" />,
    back: <path d="m15 18-6-6 6-6" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </>
    ),
    play: <path d="m9 7 8 5-8 5V7Z" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    chevronDown: <path d="m7 10 5 5 5-5" />,
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  );
}

function Pressable({
  children,
  className = "",
  label,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <button
      aria-label={label}
      className={`pressable ${className}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function Crest({
  src,
  name,
  size = "regular",
}: {
  src: string;
  name: string;
  size?: "small" | "regular" | "large";
}) {
  return (
    <div className={`crest crest-${size}`}>
      <img alt={`${name} crest`} src={src} />
    </div>
  );
}

function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: string;
}) {
  return (
    <div className="section-title">
      <div>{children}</div>
      {action && (
        <Pressable className="text-action">
          {action} <Icon name="arrow" size={14} />
        </Pressable>
      )}
    </div>
  );
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons">
        <span className="signal">▮▮▮</span>
        <span className="wifi">⌁</span>
        <span className="battery" />
      </div>
    </div>
  );
}

function TopBar({
  title,
  subtitle,
  onBack,
}: {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
}) {
  return (
    <div className="top-bar">
      {onBack ? (
        <Pressable className="circle-button" label="Go back" onClick={onBack}>
          <Icon name="back" size={19} />
        </Pressable>
      ) : (
        <div className="masthead-copy">
          <div className="eyebrow">{subtitle}</div>
          <div className="brand">{title || "Matchday"}</div>
        </div>
      )}
      {onBack && <div className="top-title">{title}</div>}
      <div className="top-actions">
        {!onBack && (
          <Pressable className="circle-button" label="Search">
            <Icon name="search" size={18} />
          </Pressable>
        )}
        <Pressable className="circle-button notification" label="Notifications">
          {onBack ? <Icon name="more" size={19} /> : <Icon name="bell" size={18} />}
          {!onBack && <span className="unread-dot" />}
        </Pressable>
      </div>
    </div>
  );
}

function LiveMatchCard({ onOpen }: { onOpen: () => void }) {
  return (
    <Pressable className="live-card" label="Open live match" onClick={onOpen}>
      <img className="live-card-photo" alt="" src={nightMatchPhoto} />
      <div className="live-card-shade" />
      <div className="live-card-top">
        <div className="league-label">
          <span className="league-mark">PL</span>
          Premier League · Etihad
        </div>
        <div className="live-pill">
          <span className="pulse-dot" />
          LIVE · 67&apos;
        </div>
      </div>
      <div className="score-row">
        <div className="score-team">
          <Crest name="Manchester City" size="large" src={crest.city} />
          <span>Man City</span>
        </div>
        <div className="score-centre">
          <span className="score">2</span>
          <span className="score-divider">—</span>
          <span className="score">1</span>
        </div>
        <div className="score-team">
          <Crest name="Liverpool" size="large" src={crest.liverpool} />
          <span>Liverpool</span>
        </div>
      </div>
      <div className="scorers">
        <span>Haaland 14&apos;, Foden 52&apos;</span>
        <span>Salah 39&apos;</span>
      </div>
      <div className="moment-row">
        <span className="moment-label">Momentum</span>
        <div className="moment-bars">
          {[4, 6, 5, 9, 12, 8, 14, 11, 7, 5, 8, 6, 4, 7, 5].map((height, index) => (
            <i
              className={index < 9 ? "home-bar" : "away-bar"}
              key={`${height}-${index}`}
              style={{ height }}
            />
          ))}
        </div>
        <Icon name="arrow" size={15} />
      </div>
      <div className="live-quick-stats">
        <span><strong>57%</strong> Possession</span>
        <span><strong>7</strong> Shots on target</span>
        <span><strong>1.82</strong> xG</span>
      </div>
    </Pressable>
  );
}

function FixtureRow({
  home,
  homeCrest,
  away,
  awayCrest,
  time,
}: {
  home: string;
  homeCrest: string;
  away: string;
  awayCrest: string;
  time: string;
}) {
  return (
    <div className="fixture-row">
      <div className="fixture-team home">
        <span>{home}</span>
        <Crest name={home} size="small" src={homeCrest} />
      </div>
      <div className="fixture-time">{time}</div>
      <div className="fixture-team">
        <Crest name={away} size="small" src={awayCrest} />
        <span>{away}</span>
      </div>
    </div>
  );
}

function HomeScreen({ openMatch }: { openMatch: () => void }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLivePolling, setIsLivePolling] = useState(false);

  const generateDateStrip = () => {
    const dates: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatDate = (date: Date) => {
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = dayNames[date.getDay()];
    const dateNum = date.getDate();
    const isToday = date.toDateString() === new Date().toDateString();
    return {
      day: isToday ? "TODAY" : day,
      date: dateNum,
      fullDate: date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
      isoDate: date.toISOString().split('T')[0],
    };
  };

  const dateStrip = generateDateStrip();

  const fetchFixtures = async (dateStr: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/fixtures?date=${dateStr}`);
      if (!response.ok) {
        throw new Error('Failed to fetch fixtures');
      }
      const data = await response.json();
      setFixtures(data.fixtures || []);
      setLastUpdated(data.lastUpdated || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setFixtures([]);
    } finally {
      setLoading(false);
    }
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  ReactUseEffect(() => {
    const { isoDate } = formatDate(selectedDate);
    fetchFixtures(isoDate);

    let intervalId: NodeJS.Timeout | null = null;

    if (isToday) {
      setIsLivePolling(true);
      intervalId = setInterval(() => {
        fetchFixtures(isoDate);
      }, 5 * 60 * 1000);
    } else {
      setIsLivePolling(false);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedDate, isToday]);

  const groupFixturesByLeague = (fixtures: any[]) => {
    const grouped: Record<string, any[]> = {};
    fixtures.forEach(fixture => {
      const leagueName = fixture.league.name;
      if (!grouped[leagueName]) {
        grouped[leagueName] = [];
      }
      grouped[leagueName].push(fixture);
    });
    return grouped;
  };

  const groupedFixtures = groupFixturesByLeague(fixtures);

  return (
    <div className="screen home-screen">
      <TopBar subtitle={formatDate(selectedDate).fullDate} />

      <div className="date-strip">
        {dateStrip.map((date) => {
          const { day, date: dateNum } = formatDate(date);
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <Pressable
              className={`date-item ${isSelected ? "active" : ""}`}
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              aria-label={`${day} ${dateNum}`}
            >
              <span>{day}</span>
              <strong>{dateNum}</strong>
            </Pressable>
          );
        })}
      </div>

      <main className="content">
        {isToday && (
  <>
    <SectionTitle>Live now</SectionTitle>

    {fixtures.filter((fixture) =>
      ["1H", "HT", "2H", "ET", "BT", "P", "LIVE"].includes(
        fixture.status
      )
    ).length > 0 ? (
      fixtures
        .filter((fixture) =>
          ["1H", "HT", "2H", "ET", "BT", "P", "LIVE"].includes(
            fixture.status
          )
        )
        .map((fixture) => (
          <div className="card fixtures" key={fixture.id}>
            <div className="fixture-heading">
              <span>{fixture.league.name}</span>
              <span>
                LIVE{fixture.elapsed != null ? ` · ${fixture.elapsed}'` : ""}
              </span>
            </div>

            <FixtureRow
              home={fixture.homeTeam.name}
              homeCrest={fixture.homeTeam.logo}
              away={fixture.awayTeam.name}
              awayCrest={fixture.awayTeam.logo}
              time={`${fixture.score.home ?? 0} — ${fixture.score.away ?? 0}`}
            />
          </div>
        ))
    ) : (
      <div className="card" style={{ padding: "24px 20px" }}>
        <strong>No live matches right now</strong>
        <p style={{ color: "var(--muted)", fontSize: "13px" }}>
          Check the fixtures below for today's scheduled matches.
        </p>
      </div>
    )}
  </>
)}

        <div className="home-hero">
  <div className="home-hero-overlay">
    <span className="home-hero-label">YOUR MATCHDAY</span>
    <h2>Your clubs. Your game.</h2>
    <p>Fixtures, results and the moments that matter.</p>
  </div>
</div>
        <SectionTitle action="Edit">Your clubs</SectionTitle>
        <div className="club-strip">
          {[
            [crest.arsenal, "Arsenal"],
            [crest.real, "Real Madrid"],
            [crest.inter, "Inter"],
            [crest.barca, "Barcelona"],
          ].map(([src, name]) => (
            <Pressable className="club-item" key={name}>
              <Crest name={name} src={src} />
              <span>{name}</span>
            </Pressable>
          ))}
          <Pressable className="club-item" label="Add club">
            <span className="add-club">+</span>
            <span>Add club</span>
          </Pressable>
        </div>

        <SectionTitle action="Full schedule">
          {isToday ? "Coming up" : "Fixtures"}
        </SectionTitle>
        {loading ? (
          <div className="card" style={{ padding: "40px 20px", textAlign: "center" }}>
            <div style={{ color: "var(--muted)", fontSize: "14px" }}>Loading fixtures...</div>
          </div>
        ) : error ? (
          <div className="card" style={{ padding: "40px 20px", textAlign: "center" }}>
            <div style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "8px" }}>
              Unable to load fixtures
            </div>
            <div style={{ color: "var(--muted-2)", fontSize: "12px" }}>
              {error}
            </div>
          </div>
        ) : Object.keys(groupedFixtures).length > 0 ? (
          <>
            {isToday && lastUpdated && (
              <div style={{ marginBottom: "12px", textAlign: "center" }}>
                <span style={{ color: "var(--muted-2)", fontSize: "11px" }}>
                  {isLivePolling ? "Live polling • " : ""}
                  Updated {new Date(lastUpdated).toLocaleTimeString()}
                </span>
              </div>
            )}
            {Object.entries(groupedFixtures).map(([leagueName, leagueFixtures], idx) => (
              <div className="card fixtures" key={idx}>
                <div className="fixture-heading">
                  <span>{leagueName}</span>
                  <span>{leagueFixtures.length} match{leagueFixtures.length !== 1 ? 'es' : ''}</span>
                </div>
              {leagueFixtures.map((fixture, matchIdx) => {
                const kickoffTime = new Date(fixture.date).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                });
                const isLive = fixture.status === 'LIVE' || fixture.status === '1H' || fixture.status === '2H';
                const isFinished = fixture.status === 'FT';
                return (
                  <div key={fixture.id}>
                    <FixtureRow
                      away={fixture.awayTeam.name}
                      awayCrest={fixture.awayTeam.logo}
                      home={fixture.homeTeam.name}
                      homeCrest={fixture.homeTeam.logo}
                      time={isFinished ? 'FT' : isLive ? `${fixture.elapsed}'` : kickoffTime}
                    />
                    {matchIdx < leagueFixtures.length - 1 && <div className="line" />}
                  </div>
                );
              })}
            </div>
            ))}
          </>
        ) : (
          <div className="card" style={{ padding: "40px 20px", textAlign: "center" }}>
            <div style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "8px" }}>
              No fixtures for this date
            </div>
            <div style={{ color: "var(--muted-2)", fontSize: "12px" }}>
              Try selecting a different date
            </div>
          </div>
        )}

        <SectionTitle action="All results">Last night</SectionTitle>
        <div className="results-scroll">
          <Pressable className="result-card">
            <div className="result-meta"><span>CHAMPIONS LEAGUE</span><strong>FT</strong></div>
            <div className="result-teams">
              <span><Crest name="Real Madrid" size="small" src={crest.real} />Real Madrid</span><strong>3</strong>
              <span><Crest name="Inter" size="small" src={crest.inter} />Inter Milan</span><strong>1</strong>
            </div>
            <small>Real progress 4–2 on aggregate</small>
          </Pressable>
          <Pressable className="result-card accent-result">
            <div className="result-meta"><span>LA LIGA</span><strong>FT</strong></div>
            <div className="result-teams">
              <span><Crest name="Barcelona" size="small" src={crest.barca} />Barcelona</span><strong>2</strong>
              <span><Crest name="Real Madrid" size="small" src={crest.real} />Real Madrid</span><strong>2</strong>
            </div>
            <small>A classic ends level in Catalonia</small>
          </Pressable>
        </div>

        <SectionTitle action="More stories">The briefing</SectionTitle>
        <Pressable className="feature-story">
          <img alt="Football stadium under lights" src={stadiumPhoto} />
          <div className="story-overlay">
            <span className="story-tag">The title race</span>
            <div className="story-title">One final weekend. Everything still to play for.</div>
            <div className="story-meta">Matchday Desk · 18 min ago</div>
          </div>
        </Pressable>
      </main>
    </div>
  );
}

const statRows = [
  ["Possession", "57%", 57, "43%"],
  ["Shots", "14", 64, "9"],
  ["Shots on target", "7", 70, "3"],
  ["Expected goals", "1.82", 61, "1.14"],
  ["Corners", "6", 60, "4"],
];

function MatchCentre({ onBack }: { onBack: () => void }) {
  const [matchTab, setMatchTab] = useState("Timeline");
  return (
    <div className="screen match-screen">
      <TopBar onBack={onBack} title="Match Centre" />
      <div className="match-hero">
        <div className="competition">Premier League · Etihad Stadium</div>
        <div className="hero-score">
          <div className="hero-team">
            <Crest name="Manchester City" size="large" src={crest.city} />
            <span>Man City</span>
          </div>
          <div>
            <div className="hero-scoreline">2 <em>—</em> 1</div>
            <div className="hero-live"><i /> 67:24</div>
          </div>
          <div className="hero-team">
            <Crest name="Liverpool" size="large" src={crest.liverpool} />
            <span>Liverpool</span>
          </div>
        </div>
        <div className="hero-scorers">
          <span>Haaland 14&apos;<br />Foden 52&apos;</span>
          <span>Salah 39&apos;</span>
        </div>
      </div>

      <div className="segmented">
        {["Timeline", "Lineups", "Stats"].map((tab) => (
          <Pressable
            className={matchTab === tab ? "selected" : ""}
            key={tab}
            onClick={() => setMatchTab(tab)}
          >
            {tab}
          </Pressable>
        ))}
      </div>

      <main className="content match-content">
        {matchTab === "Timeline" && (
          <>
            <div className="live-commentary card">
              <span className="live-kicker"><i /> Live commentary</span>
              <div>Liverpool are pressing high as City look to slow the tempo.</div>
              <small>67&apos; · Attacking phase</small>
            </div>
            <SectionTitle>Key moments</SectionTitle>
            <div className="timeline">
              {[
                ["52'", "goal", "GOAL · 2–1", "Phil Foden", "Low finish from the edge of the box", "city"],
                ["46'", "sub", "SUBSTITUTION", "J. Doku on", "J. Grealish off", "city"],
                ["HT", "half", "HALF TIME", "Manchester City 1–1 Liverpool", "", "neutral"],
                ["39'", "goal", "GOAL · 1–1", "Mohamed Salah", "Penalty, left footed", "liverpool"],
                ["14'", "goal", "GOAL · 1–0", "Erling Haaland", "Assist by Kevin De Bruyne", "city"],
              ].map(([minute, type, title, player, detail, team]) => (
                <div className="timeline-item" key={`${minute}-${title}`}>
                  <div className="timeline-minute">{minute}</div>
                  <div className={`timeline-node ${type}`}>
                    {type === "goal" ? <Icon name="ball" size={14} /> : type === "sub" ? "↕" : "–"}
                  </div>
                  <div className="timeline-copy">
                    <span>{title}</span>
                    <strong>{player}</strong>
                    {detail && <small>{detail}</small>}
                  </div>
                  {team !== "neutral" && (
                    <Crest
                      name={team}
                      size="small"
                      src={team === "city" ? crest.city : crest.liverpool}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {matchTab === "Lineups" && (
          <>
            <SectionTitle>Starting XI</SectionTitle>
            <div className="pitch">
              <div className="pitch-line centre-line" />
              <div className="pitch-circle" />
              {[
                ["31", "Ederson", 50, 88],
                ["2", "Walker", 17, 68],
                ["3", "Dias", 39, 68],
                ["25", "Akanji", 62, 68],
                ["24", "Gvardiol", 84, 68],
                ["16", "Rodri", 35, 47],
                ["8", "Kovačić", 66, 47],
                ["20", "B. Silva", 18, 25],
                ["17", "De Bruyne", 50, 29],
                ["10", "Grealish", 82, 25],
                ["9", "Haaland", 50, 8],
              ].map(([number, name, left, top]) => (
                <div className="player-dot" key={name} style={{ left: `${left}%`, top: `${top}%` }}>
                  <span>{number}</span>
                  <small>{name}</small>
                </div>
              ))}
            </div>
            <div className="lineup-team card">
              <Crest name="Manchester City" src={crest.city} />
              <div><strong>Manchester City</strong><small>4–2–3–1 · Pep Guardiola</small></div>
            </div>
          </>
        )}

        {matchTab === "Stats" && (
          <>
            <SectionTitle>Team statistics</SectionTitle>
            <div className="card stats-card">
              <div className="stats-clubs">
                <span><Crest name="Manchester City" size="small" src={crest.city} /> MCI</span>
                <span><Crest name="Liverpool" size="small" src={crest.liverpool} /> LIV</span>
              </div>
              {statRows.map(([label, home, width, away]) => (
                <div className="stat-row" key={String(label)}>
                  <div><strong>{home}</strong><span>{label}</span><strong>{away}</strong></div>
                  <div className="stat-track">
                    <i style={{ width: `${width}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <SectionTitle>Match momentum</SectionTitle>
            <div className="card chart-card">
              <div className="chart">
                {[28, 38, 32, 47, 58, 42, 70, 62, 83, 57, 38, 48, 32, 23, 35, 49, 68, 52].map(
                  (value, index) => <i key={`${value}-${index}`} style={{ height: `${value}%` }} />
                )}
              </div>
              <div className="chart-axis"><span>KO</span><span>HT</span><span>67&apos;</span></div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function DiscoverScreen() {
  const [topic, setTopic] = useState("For you");
  return (
    <div className="screen discover-screen">
      <TopBar subtitle="The football desk" title="Discover" />
      <div className="topic-tabs">
        {["For you", "Latest", "Transfers", "Tactics"].map((item) => (
          <Pressable className={topic === item ? "active" : ""} key={item} onClick={() => setTopic(item)}>
            {item}
          </Pressable>
        ))}
      </div>
      <main className="content discover-content">
        <Pressable className="discover-hero">
          <img alt="Football match in progress" src={matchPhoto} />
          <div className="image-shade" />
          <div className="discover-hero-copy">
            <span className="story-tag">Matchday analysis</span>
            <div className="discover-headline">The five minutes that changed the title race</div>
            <p>How one tactical switch turned pressure into a statement win.</p>
            <span className="story-meta">6 min read · 24 min ago</span>
          </div>
        </Pressable>

        <SectionTitle action="See all">What you missed</SectionTitle>
        <div className="missed-scroll">
          <Pressable className="missed-card">
            <div className="missed-image"><img alt="Fans in a packed football stadium" src={crowdPhoto} /><span>3:42</span></div>
            <strong>Late drama at San Siro</strong>
            <small>Highlights · Champions League</small>
          </Pressable>
          <Pressable className="missed-card">
            <div className="missed-score">
              <div><Crest name="Real Madrid" src={crest.real} /><Crest name="Barcelona" src={crest.barca} /></div>
              <strong>3 — 3</strong>
              <span>FULL TIME</span>
            </div>
            <strong>Six-goal Clásico thriller</strong>
            <small>Recap · La Liga</small>
          </Pressable>
        </div>

        <SectionTitle action="Latest">The features</SectionTitle>
        <div className="editorial-grid">
          <Pressable className="editorial-main">
            <img alt="Football stadium packed with supporters" src={floodlightsPhoto} />
            <div>
              <span>THE BIG READ</span>
              <strong>Inside the stadium where the title will be decided</strong>
              <small>Matchday Features · 8 min</small>
            </div>
          </Pressable>
          <div className="editorial-side">
            <Pressable>
              <img alt="Night football match" src={nightMatchPhoto} />
              <span>TACTICS</span>
              <strong>The press that changed everything</strong>
            </Pressable>
            <Pressable>
              <img alt="Football crowd" src={crowdPhoto} />
              <span>CULTURE</span>
              <strong>Why the noise matters</strong>
            </Pressable>
          </div>
        </div>

        <SectionTitle action="All players">Players to watch</SectionTitle>
        <Pressable className="player-profile card">
          <div className="player-visual">
            <span className="player-number">7</span>
            <img alt="Footballer preparing to play" src="https://images.unsplash.com/photo-1556816214-fda351e4a7fb?auto=format&fit=crop&w=600&q=85" />
          </div>
          <div className="player-copy">
            <span className="trend-pill">FORM PLAYER</span>
            <div className="player-name">Vinícius Jr.</div>
            <span>Real Madrid · Forward</span>
            <div className="player-numbers">
              <div><strong>8.4</strong><small>Rating</small></div>
              <div><strong>5</strong><small>Goals</small></div>
              <div><strong>3</strong><small>Assists</small></div>
            </div>
          </div>
        </Pressable>

        <SectionTitle>More for you</SectionTitle>
        <div className="news-list">
          {[
            ["TRANSFER INTEL", "Why Europe’s elite are watching this 19-year-old midfielder", stadiumPhoto, "4 min"],
            ["TACTICS", "The return of the traditional number nine", matchPhoto, "7 min"],
          ].map(([tag, title, image, read]) => (
            <Pressable className="news-row" key={title}>
              <img alt="" src={image} />
              <div><span>{tag}</span><strong>{title}</strong><small>{read} read</small></div>
            </Pressable>
          ))}
        </div>
      </main>
    </div>
  );
}

function MatchesScreen({ openMatch }: { openMatch: () => void }) {
  const [filter, setFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isLivePolling, setIsLivePolling] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
  };

  const toIsoDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isToday = selectedDate.toDateString() === new Date().toDateString();

  const fetchFixtures = async (dateStr: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/api/fixtures?date=${dateStr}`);
      if (!response.ok) {
        throw new Error('Failed to fetch fixtures');
      }
      const data = await response.json();
      setFixtures(data.fixtures || []);
      setLastUpdated(data.lastUpdated || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setFixtures([]);
    } finally {
      setLoading(false);
    }
  };

  ReactUseEffect(() => {
    fetchFixtures(toIsoDate(selectedDate));

    let intervalId: NodeJS.Timeout | null = null;

    if (isToday) {
      setIsLivePolling(true);
      intervalId = setInterval(() => {
        fetchFixtures(toIsoDate(selectedDate));
      }, 5 * 60 * 1000);
    } else {
      setIsLivePolling(false);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedDate, isToday]);

  const groupFixturesByLeague = (fixtures: any[]) => {
    const grouped: Record<string, any[]> = {};
    fixtures.forEach(fixture => {
      const leagueName = fixture.league.name;
      if (!grouped[leagueName]) {
        grouped[leagueName] = [];
      }
      grouped[leagueName].push(fixture);
    });
    return grouped;
  };

  const groupedFixtures = groupFixturesByLeague(fixtures);
  const totalMatches = fixtures.length;

  const getLeagueMark = (leagueName: string) => {
    if (leagueName.includes('Premier League')) return 'PL';
    if (leagueName.includes('Champions League')) return 'CL';
    if (leagueName.includes('La Liga')) return 'LL';
    if (leagueName.includes('Serie A')) return 'SA';
    if (leagueName.includes('Bundesliga')) return 'BL';
    if (leagueName.includes('Ligue 1')) return 'L1';
    return '??';
  };

  return (
    <div className="screen matches-screen">
      <TopBar subtitle="All competitions" title="Matches" />
      <div className="match-date">
        <Pressable className="circle-button" onClick={() => {
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() - 1);
          setSelectedDate(newDate);
        }}><Icon name="back" size={17} /></Pressable>
        <div><strong>{formatDate(selectedDate)}</strong><span>{totalMatches} match{totalMatches !== 1 ? 'es' : ''}</span></div>
        <Pressable className="circle-button" onClick={() => {
          const newDate = new Date(selectedDate);
          newDate.setDate(newDate.getDate() + 1);
          setSelectedDate(newDate);
        }}><Icon name="arrow" size={17} /></Pressable>
      </div>
      <div className="competition-filters">
        {["All", "Live", "Premier League", "Champions League", "La Liga"].map((item) => (
          <Pressable className={filter === item ? "active" : ""} key={item} onClick={() => setFilter(item)}>
            {item === "Live" && <i />}
            {item}
          </Pressable>
        ))}
      </div>
      <main className="content">
        {loading ? (
          <div className="card" style={{ padding: "40px 20px", textAlign: "center" }}>
            <div style={{ color: "var(--muted)", fontSize: "14px" }}>Loading fixtures...</div>
          </div>
        ) : error ? (
          <div className="card" style={{ padding: "40px 20px", textAlign: "center" }}>
            <div style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "8px" }}>
              Unable to load fixtures
            </div>
            <div style={{ color: "var(--muted-2)", fontSize: "12px" }}>
              {error}
            </div>
          </div>
        ) : Object.keys(groupedFixtures).length > 0 ? (
          <>
            {isToday && lastUpdated && (
              <div style={{ marginBottom: "12px", textAlign: "center" }}>
                <span style={{ color: "var(--muted-2)", fontSize: "11px" }}>
                  {isLivePolling ? "Live polling • " : ""}
                  Updated {new Date(lastUpdated).toLocaleTimeString()}
                </span>
              </div>
            )}
            {Object.entries(groupedFixtures).map(([leagueName, leagueFixtures], idx) => (
              <div className="competition-block" key={idx}>
                <div className="competition-head">
                  <span className={`league-mark ${leagueName.includes('Champions') ? 'europe' : ''}`}>
                    {getLeagueMark(leagueName)}
                  </span>
                  <strong>{leagueName}</strong>
                  <span>{leagueFixtures[0]?.league.country || ''}</span>
                </div>
              {leagueFixtures.map((fixture) => {
                const kickoffTime = new Date(fixture.date).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                });
                const isLive = fixture.status === 'LIVE' || fixture.status === '1H' || fixture.status === '2H';
                const isFinished = fixture.status === 'FT';
                const isNotStarted = fixture.status === 'NS' || fixture.status === 'TBD';

                if (isLive) {
                  return (
                    <Pressable className="compact-live" key={fixture.id} onClick={openMatch}>
                      <span className="mini-live">LIVE {fixture.elapsed}'</span>
                      <div><Crest name={fixture.homeTeam.name} size="small" src={fixture.homeTeam.logo} /><span>{fixture.homeTeam.name}</span><strong>{fixture.score.home}</strong></div>
                      <div><Crest name={fixture.awayTeam.name} size="small" src={fixture.awayTeam.logo} /><span>{fixture.awayTeam.name}</span><strong>{fixture.score.away}</strong></div>
                    </Pressable>
                  );
                }

                return (
                  <div className={`compact-match ${isFinished ? 'finished' : ''}`} key={fixture.id}>
                    <span>{isFinished ? 'FT' : isNotStarted ? kickoffTime : fixture.status}</span>
                    <div><Crest name={fixture.homeTeam.name} size="small" src={fixture.homeTeam.logo} /><span>{fixture.homeTeam.name}</span><strong>{isNotStarted ? '–' : fixture.score.home}</strong></div>
                    <div><Crest name={fixture.awayTeam.name} size="small" src={fixture.awayTeam.logo} /><span>{fixture.awayTeam.name}</span><strong>{isNotStarted ? '–' : fixture.score.away}</strong></div>
                  </div>
                );
              })}
            </div>
            ))}
          </>
        ) : (
          <div className="card" style={{ padding: "40px 20px", textAlign: "center" }}>
            <div style={{ color: "var(--muted)", fontSize: "14px", marginBottom: "8px" }}>
              No fixtures for this date
            </div>
            <div style={{ color: "var(--muted-2)", fontSize: "12px" }}>
              Try selecting a different date
            </div>
          </div>
        )}
        <div className="sync-card">
          <Icon name="calendar" size={24} />
          <div><strong>Never miss kick-off</strong><span>Sync fixtures with your calendar</span></div>
          <Pressable>Sync</Pressable>
        </div>
      </main>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="screen profile-screen">
      <TopBar subtitle="Matchday member" title="Profile" />
      <main className="content profile-content">
        <div className="profile-card">
          <div className="avatar">JD</div>
          <div><div className="profile-name">Jamie Davies</div><span>Following 4 clubs · London</span></div>
          <Pressable className="circle-button"><Icon name="settings" size={18} /></Pressable>
        </div>
        <SectionTitle>This season</SectionTitle>
        <div className="season-grid">
          <div><strong>126</strong><span>Matches followed</span></div>
          <div><strong>18</strong><span>Live matches</span></div>
          <div><strong>4</strong><span>Favourite clubs</span></div>
        </div>
        <SectionTitle>Favourite club</SectionTitle>
        <div className="favourite-card">
          <Crest name="Arsenal" size="large" src={crest.arsenal} />
          <div><strong>Arsenal</strong><span>Premier League · Following</span></div>
          <Icon name="star" size={19} />
        </div>
        <div className="settings-list card">
          {[
            ["bell", "Match notifications"],
            ["star", "Following"],
            ["calendar", "Calendar sync"],
            ["settings", "App preferences"],
          ].map(([icon, label]) => (
            <Pressable key={label}><Icon name={icon} size={18} /><span>{label}</span><Icon name="arrow" size={16} /></Pressable>
          ))}
        </div>
      </main>
    </div>
  );
}

function BottomNav({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (tab: Tab) => void;
}) {
  const items: [Tab, string, string][] = [
    ["home", "home", "Home"],
    ["matches", "ball", "Matches"],
    ["discover", "compass", "Discover"],
    ["profile", "user", "Profile"],
  ];
  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map(([tab, icon, label]) => (
        <Pressable
          className={`nav-item ${active === tab ? "active" : ""}`}
          key={tab}
          label={label}
          onClick={() => onChange(tab)}
        >
          <span className="nav-icon"><Icon name={icon} size={21} /></span>
          <span>{label}</span>
        </Pressable>
      ))}
    </nav>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [matchOpen, setMatchOpen] = useState(false);

  const openMatch = () => {
    setActiveTab("matches");
    setMatchOpen(true);
    document.querySelector(".phone-content")?.scrollTo(0, 0);
  };

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    setMatchOpen(false);
    document.querySelector(".phone-content")?.scrollTo(0, 0);
  };

  return (
    <div className="app-stage">
      <div className="phone-shell">
        <StatusBar />
        <div className="phone-content">
          {activeTab === "home" && <HomeScreen openMatch={openMatch} />}
          {activeTab === "matches" && !matchOpen && <MatchesScreen openMatch={openMatch} />}
          {activeTab === "matches" && matchOpen && <MatchCentre onBack={() => setMatchOpen(false)} />}
          {activeTab === "discover" && <DiscoverScreen />}
          {activeTab === "profile" && <ProfileScreen />}
        </div>
        <BottomNav active={activeTab} onChange={changeTab} />
      </div>
    </div>
  );
}
