/* eslint-disable @next/next/no-img-element */
import { PIPELINE } from "@/lib/content";

/**
 * Product UI cards that float over photos (Features) and the CTA banner.
 * Each is drawn at its Figma base size; placements scale them with <Scaled>.
 * Elements tagged data-bar / data-donut / data-row are animated by the parent section.
 */

export const INSIGHTS_SIZE = { w: 380, h: 284.05 };
export const ANALYTICS_SIZE = { w: 318.4, h: 238.004 };
export const PIPELINE_SIZE = { w: 320, h: 239.2 };

export function InsightsPanel() {
  return (
    <div className="panel panel--insights" aria-hidden>
      <div className="panel__sheet">
        <div className="panel__head">
          <span>Interview insights</span>
          <img src="/icons/ui-chart.svg" alt="" width={13.342} height={13.342} />
        </div>
        <div className="insights__body">
          <div className="insights__metric">
            <div className="panel__row">
              <span>Success rate</span>
              <b style={{ color: "#11ad11" }}>78%</b>
            </div>
            <div className="bar" style={{ background: "#dbfce7" }}>
              <i data-bar style={{ width: "69.8%", background: "#00a63e" }} />
            </div>
          </div>
          <div className="insights__metric">
            <div className="panel__row">
              <span>Interview-to-hire rate</span>
              <b style={{ color: "#155dfc" }}>63%</b>
            </div>
            <div className="bar" style={{ background: "#dbeafe" }}>
              <i data-bar style={{ width: "62.8%", background: "#155dfc" }} />
            </div>
          </div>
          <div className="panel__row">
            <span>Avg. interview time</span>
            <b>
              42.5<span className="panel__unit"> min</span>
            </b>
          </div>
          <div className="panel__row">
            <span>Culture fit trend</span>
            <b style={{ color: "#26c226" }}>
              +12% <span className="panel__tiny">vs last 30 days</span>
            </b>
          </div>
          <div className="panel__row">
            <span>Decision consistency</span>
            <b style={{ color: "#26c226" }}>94.5%</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsPanel() {
  return (
    <div className="panel panel--analytics" aria-hidden>
      <div className="panel__sheet">
        <div className="panel__head">
          <span>Hiring analytics</span>
          <img src="/icons/ui-pie.svg" alt="" width={12.687} height={12.682} />
        </div>
        <div className="analytics__chart">
          <div className="donut">
            <img data-donut src="/icons/donut.svg" alt="" width={88.792} height={88.792} />
            <div className="donut__label">
              <b>27</b>
              <span>hires</span>
            </div>
          </div>
          <div className="legend">
            <span><i style={{ background: "#26c226" }} />Referrals</span><b>13</b>
            <span><i style={{ background: "#ad46ff" }} />Job boards</span><b>9</b>
            <span><i style={{ background: "#155dfc" }} />LinkedIn</span><b>5</b>
          </div>
        </div>
        <div className="analytics__stats">
          <div className="panel__row">
            <span>Avg. decision time</span>
            <b>
              12.5 <span className="panel__unit">days</span>
            </b>
          </div>
          <div className="panel__row">
            <span>Acceptance rate</span>
            <b style={{ color: "#26c226" }}>92%</b>
          </div>
          <div className="panel__row">
            <span>Rejection rate</span>
            <b style={{ color: "#ff6b35" }}>8%</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PipelinePanel() {
  return (
    <div className="panel panel--pipeline" aria-hidden>
      <div className="pipeline__sheet">
        <div className="pipeline__head">
          <span>Your candidate pipeline</span>
          <img src="/icons/chevron.svg" alt="" width={4.425} height={8.048} />
        </div>
        <div className="pipeline__list">
          {PIPELINE.map((p) => (
            <div className={`pipeline__row tone-${p.tone}`} key={p.name} data-row>
              <div className="pipeline__who">
                <span className="pipeline__initials">{p.initials}</span>
                <span className="pipeline__name">
                  <b>{p.name}</b>
                  <span>{p.title}</span>
                </span>
              </div>
              <div className="pipeline__meta">
                <span className="pipeline__score">
                  <img src="/icons/star.svg" alt="" width={6} height={6} />
                  {p.score}
                </span>
                <span className="pipeline__stage">{p.stage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
