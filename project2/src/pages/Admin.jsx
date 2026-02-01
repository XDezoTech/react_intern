// pages/Admin.jsx — Redesigned Dashboard
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWatchlist, getRatedList, getNotes } from '../utils/storage';
import { posterUrl } from '../api/tmdb';

const FB = 'https://via.placeholder.com/36x54/eeede8/9a9690?text=?';

// ── Circular progress ring component ──
function RingChart({ pct = 0, size = 110, stroke = 8, color = 'var(--green)', label, value }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-subtle)" strokeWidth={stroke} />
          {/* Fill */}
          <circle
            cx={size/2} cy={size/2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>
        {/* Center text */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--ink)', lineHeight: 1 }}>
            {value}
          </span>
          <span style={{ fontSize: 10, color: 'var(--ink-muted)', marginTop: 2 }}>{pct}%</span>
        </div>
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-secondary)', letterSpacing: '0.3px' }}>{label}</span>
    </div>
  );
}

// ── Score gauge bar ──
function ScoreGauge({ score = 0 }) {
  // score is 0–10
  const pct = (score / 10) * 100;
  const color = score >= 8 ? 'var(--green)' : score >= 6 ? 'var(--gold)' : score >= 4 ? '#e07b39' : 'var(--accent)';
  const label = score >= 8 ? 'Excellent taste!' : score >= 6 ? 'Pretty good' : score >= 4 ? 'Mixed bag' : 'Tough critic';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, color, lineHeight: 1 }}>
          {score}
        </span>
        <span style={{ fontSize: 13, color: 'var(--ink-muted)', fontStyle: 'italic' }}>{label}</span>
      </div>
      {/* Segmented gauge */}
      <div style={{ display: 'flex', gap: 3, height: 10 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: 3,
              background: i < Math.round(score) ? color : 'var(--bg-subtle)',
              transition: `background 0.4s ease ${i * 0.05}s`,
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 10, color: 'var(--ink-faint)' }}>
        <span>0</span><span>5</span><span>10</span>
      </div>
    </div>
  );
}

// ── Donut chart for rating distribution ──
function DonutChart({ dist, total }) {
  const size = 140;
  const strokeW = 24;
  const r = (size - strokeW) / 2;
  const circ = 2 * Math.PI * r;

  const COLORS = ['#2d7a47', '#6ab04c', '#f0a500', '#e07b39', '#c0392b'];

  // Build segments
  let offset = 0;
  const segments = dist.map((d, i) => {
    const pct = total > 0 ? d.count / total : 0;
    const dash = pct * circ;
    const seg = { ...d, dash, offset: circ - offset, color: COLORS[i] };
    offset += dash;
    return seg;
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      {/* Donut */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-subtle)" strokeWidth={strokeW} />
          {total > 0 && segments.map((s, i) => (
            <circle
              key={i}
              cx={size/2} cy={size/2} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={strokeW}
              strokeDasharray={`${s.dash} ${circ - s.dash}`}
              strokeDashoffset={s.offset}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--ink)' }}>{total}</span>
          <span style={{ fontSize: 10, color: 'var(--ink-muted)' }}>rated</span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
        {dist.map((d, i) => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i], flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: 'var(--ink-secondary)', flex: 1 }}>{d.label}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>{d.count}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-faint)', width: 32, textAlign: 'right' }}>
              {total > 0 ? Math.round((d.count / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Timeline activity item ──
function TimelineItem({ item, isLast, onClick }) {
  const icons = { rated: '⭐', watchlist: item.watched ? '✅' : '🎬' };
  const colors = { rated: '#b8860b', watchlist: item.watched ? '#2d7a47' : '#5a7abf' };
  const labels = {
    rated: `Rated ${item.rating}/10`,
    watchlist: item.watched ? 'Marked as watched' : 'Added to watchlist',
  };

  return (
    <div style={{ display: 'flex', gap: 12, cursor: 'pointer' }} onClick={onClick}>
      {/* Timeline spine */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: `${colors[item.action]}18`,
          border: `1.5px solid ${colors[item.action]}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0,
        }}>
          {icons[item.action]}
        </div>
        {!isLast && (
          <div style={{ width: 1.5, flex: 1, background: 'var(--border)', minHeight: 16, margin: '3px 0' }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : 14, flex: 1, overflow: 'hidden' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: colors[item.action] }}>
            {labels[item.action]}
          </span>
          <span style={{ fontSize: 10, color: 'var(--ink-faint)' }}>
            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Admin component ──
function Admin() {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState([]);
  const [ratings,   setRatings]   = useState([]);
  const [noteCount, setNoteCount] = useState(0);

  useEffect(() => {
    setWatchlist(getWatchlist());
    setRatings(getRatedList());
    setNoteCount(Object.keys(getNotes()).length);
  }, []);

  const watched   = watchlist.filter(m => m.watched).length;
  const unwatched = watchlist.length - watched;
  const watchPct  = watchlist.length ? Math.round((watched / watchlist.length) * 100) : 0;
  const ratePct   = watchlist.length ? Math.round((ratings.length / watchlist.length) * 100) : 0;
  const avg       = ratings.length
    ? parseFloat((ratings.reduce((s, r) => s + r.rating, 0) / ratings.length).toFixed(1))
    : 0;

  const dist = [
    { label: '9 – 10  Masterpiece', count: ratings.filter(r => r.rating >= 9).length },
    { label: '7 – 8   Great',       count: ratings.filter(r => r.rating >= 7 && r.rating < 9).length },
    { label: '5 – 6   Decent',      count: ratings.filter(r => r.rating >= 5 && r.rating < 7).length },
    { label: '3 – 4   Poor',        count: ratings.filter(r => r.rating >= 3 && r.rating < 5).length },
    { label: '1 – 2   Awful',       count: ratings.filter(r => r.rating < 3).length },
  ];

  const activity = [
    ...watchlist.map(m => ({ ...m, action: 'watchlist', date: m.addedAt })),
    ...ratings.map(m => ({ ...m, action: 'rated', date: m.ratedAt })),
  ].sort((a, b) => b.date - a.date).slice(0, 7);

  const topPicks = [...ratings].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="page-wrapper">
      <div className="container">

        {/* ── PAGE HEADER ── */}
        <div style={{ padding: '36px 0 32px', borderBottom: '1px solid var(--border)', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '3px 10px',
            background: 'var(--accent-light)', border: '1px solid #f5c6c2',
            borderRadius: 6, fontSize: 11, fontWeight: 700,
            letterSpacing: '1px', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: 10,
          }}>
            Analytics
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--ink)', marginBottom: 4 }}>
                Your Library
              </h1>
              <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>
                {watchlist.length} movies collected · {ratings.length} rated · {noteCount} notes written
              </p>
            </div>
            {/* Quick nav */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/movies')}>Browse</button>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/watchlist')}>Watchlist</button>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/ratings')}>Ratings</button>
            </div>
          </div>
        </div>

        {/* ── TOP SECTION: 3 ring charts + score gauge ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 16,
        }}>

          {/* Ring charts card */}
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px 24px',
          }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 24 }}>
              Library Overview
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20 }}>
              <RingChart
                pct={watchPct}
                value={watched}
                label="Watched"
                color="var(--green)"
              />
              <RingChart
                pct={ratePct}
                value={ratings.length}
                label="Rated"
                color="var(--gold)"
              />
              <RingChart
                pct={watchlist.length > 0 ? Math.round((noteCount / watchlist.length) * 100) : 0}
                value={noteCount}
                label="Notes"
                color="#5a7abf"
              />
            </div>

            {/* Legend row */}
            <div style={{
              display: 'flex', gap: 16, marginTop: 24,
              padding: '14px 0 0', borderTop: '1px solid var(--border)',
              justifyContent: 'center', flexWrap: 'wrap',
            }}>
              {[
                { label: 'Total in Library', value: watchlist.length, color: 'var(--ink)' },
                { label: 'Unwatched',         value: unwatched,        color: 'var(--accent)' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Score gauge card */}
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 24 }}>
              Average Score
            </p>
            {ratings.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'var(--ink-muted)', fontSize: 14, textAlign: 'center' }}>
                  Rate some movies<br/>to see your score
                </p>
              </div>
            ) : (
              <>
                <ScoreGauge score={avg} />

                {/* Mini stats below gauge */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 10, marginTop: 24,
                }}>
                  {[
                    { label: 'Highest',  value: Math.max(...ratings.map(r => r.rating)) },
                    { label: 'Lowest',   value: Math.min(...ratings.map(r => r.rating)) },
                    { label: 'Rated 8+', value: ratings.filter(r => r.rating >= 8).length },
                  ].map(s => (
                    <div key={s.label} style={{
                      background: 'var(--bg)',
                      borderRadius: 8,
                      padding: '10px',
                      textAlign: 'center',
                      border: '1px solid var(--border)',
                    }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--ink)' }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── BOTTOM SECTION: Donut + Top Picks + Activity ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 16,
          marginBottom: 16,
        }}>

          {/* Donut rating distribution */}
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
          }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 20 }}>
              Score Breakdown
            </p>
            {ratings.length === 0 ? (
              <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>No ratings yet.</p>
            ) : (
              <DonutChart dist={dist} total={ratings.length} />
            )}
          </div>

          {/* Top picks — poster strip */}
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
          }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 20 }}>
              My Top Picks
            </p>
            {topPicks.length === 0 ? (
              <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>No ratings yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {topPicks.map((m, i) => (
                  <div
                    key={m.id}
                    onClick={() => navigate(`/movie/${m.id}`)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 6px',
                      borderBottom: i < topPicks.length - 1 ? '1px solid var(--border)' : 'none',
                      cursor: 'pointer', transition: 'background 0.15s',
                      borderRadius: i === 0 ? '6px 6px 0 0' : i === topPicks.length - 1 ? '0 0 6px 6px' : 0,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-subtle)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Rank number */}
                    <span style={{
                      width: 20, textAlign: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: 16,
                      color: i === 0 ? 'var(--gold)' : 'var(--ink-faint)',
                      fontWeight: 700,
                    }}>
                      {i + 1}
                    </span>

                    {/* Poster */}
                    <img
                      src={m.poster_path ? posterUrl(m.poster_path, 'w92') : FB}
                      alt={m.title}
                      style={{ width: 28, height: 42, objectFit: 'cover', borderRadius: 3, flexShrink: 0 }}
                      onError={e => { e.target.src = FB; }}
                    />

                    {/* Title + year */}
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {m.title}
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--ink-muted)' }}>{m.release_date?.slice(0, 4)}</div>
                    </div>

                    {/* Score pill */}
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: 100,
                      fontSize: 12,
                      fontWeight: 700,
                      background: m.rating >= 8 ? 'var(--green-light)' : 'var(--gold-light)',
                      color: m.rating >= 8 ? 'var(--green)' : 'var(--gold)',
                      border: `1px solid ${m.rating >= 8 ? '#b8dfc8' : '#e8d48a'}`,
                      flexShrink: 0,
                    }}>
                      {m.rating}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timeline activity feed */}
          <div style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
          }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 20 }}>
              Recent Activity
            </p>
            {activity.length === 0 ? (
              <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>No activity yet.</p>
            ) : (
              <div>
                {activity.map((item, i) => (
                  <TimelineItem
                    key={`${item.action}-${item.id}-${i}`}
                    item={item}
                    isLast={i === activity.length - 1}
                    onClick={() => navigate(`/movie/${item.id}`)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Admin;
