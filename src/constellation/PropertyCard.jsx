/**
 * PropertyCard — Local Constellation shim
 * Mirrors the @zillow/constellation PropertyCard API.
 * Swap to real import when registry access is available:
 *   import { PropertyCard } from '@zillow/constellation';
 */
import { createContext, useContext, useState } from 'react';
import './PropertyCard.css';

const CardContext = createContext({ appearance: 'default' });

/* ── Root ── */
function Root({ appearance = 'default', children, className = '', ...props }) {
  return (
    <CardContext.Provider value={{ appearance }}>
      <article className={`pc-root pc-root--${appearance} ${className}`} {...props}>
        {children}
      </article>
    </CardContext.Provider>
  );
}

/* ── Photo ── */
function Photo({ src, alt, children }) {
  if (children) return <div className="pc-photo">{children}</div>;
  if (src) return <img className="pc-photo" src={src} alt={alt} loading="lazy" />;
  return <div className="pc-photo pc-photo--placeholder" />;
}

/* ── PhotoBody (wrapper for aspect ratio control) ── */
function PhotoBody({ children, className = '' }) {
  return <div className={`pc-photo-body ${className}`}>{children}</div>;
}

/* ── PhotoWrapper ── */
function PhotoWrapper({ children }) {
  return <div className="pc-photo-wrapper">{children}</div>;
}

/* ── PhotoHeader (badge + save overlay) ── */
function PhotoHeader({ children }) {
  return <div className="pc-photo-header">{children}</div>;
}

/* ── Badge ── */
function Badge({ tone = 'neutral', children }) {
  return <span className={`pc-badge pc-badge--${tone}`}>{children}</span>;
}

/* ── BadgeArea ── */
function BadgeArea({ children }) {
  return <div className="pc-badge-area">{children}</div>;
}

/* ── SaveArea ── */
function SaveArea({ children }) {
  return <div className="pc-save-area">{children}</div>;
}

/* ── SaveButton (IconHeartFilled) ── */
function SaveButton({ onClick, onSelectedChange, selected: controlledSelected }) {
  const [internalSelected, setInternalSelected] = useState(false);
  const selected = controlledSelected !== undefined ? controlledSelected : internalSelected;

  const handleClick = (e) => {
    e.stopPropagation();
    const next = !selected;
    setInternalSelected(next);
    onSelectedChange?.(next);
    onClick?.(e);
  };

  return (
    <button
      className={`pc-save-btn ${selected ? 'pc-save-btn--selected' : ''}`}
      onClick={handleClick}
      aria-label={selected ? 'Unsave home' : 'Save home'}
    >
      <svg viewBox="16 10 32 29" width="32" height="32">
        {/* Dark filled heart underneath */}
        <path d="M39.2004 10.0001C36.6834 10.0121 34.2778 11.039 32.528 12.8482L32 13.3922L31.472 12.8482C29.7222 11.039 27.3166 10.0121 24.7996 10.0001C22.8712 9.99159 20.9974 10.6406 19.4874 11.8402C17.4422 13.4798 16.1828 15.9055 16.0184 18.5216C15.8539 21.1377 16.7996 23.702 18.6233 25.5848L19.3594 26.3369L31.2 38.4655C31.4106 38.6805 31.699 38.8017 32 38.8017C32.301 38.8017 32.5894 38.6805 32.8 38.4655L44.6406 26.3369L45.3767 25.5848C47.2004 23.702 48.1461 21.1377 47.9816 18.5216C47.8172 15.9055 46.5578 13.4798 44.5126 11.8402C43.0026 10.6406 41.1288 9.99159 39.2004 10.0001Z" fill="rgba(0,0,0,0.6)" />
        {/* White outlined heart on top */}
        <path fillRule="evenodd" clipRule="evenodd" d="M32.528 12.8482C34.2778 11.039 36.6834 10.0121 39.2004 10.0001C41.1288 9.99159 43.0026 10.6406 44.5126 11.8402C46.5578 13.4798 47.8172 15.9055 47.9816 18.5216C48.1461 21.1377 47.2004 23.702 45.3767 25.5848L44.6406 26.3369L32.8 38.4655C32.5894 38.6805 32.301 38.8017 32 38.8017C31.699 38.8017 31.4106 38.6805 31.2 38.4655L19.3594 26.3369L18.6233 25.5848C16.7996 23.702 15.8539 21.1377 16.0184 18.5216C16.1828 15.9055 17.4422 13.4798 19.4874 11.8402C20.9974 10.6406 22.8712 9.99159 24.7996 10.0001C27.3166 10.0121 29.7222 11.039 31.472 12.8482L32 13.3922L32.528 12.8482ZM42.5284 14.3363C41.5814 13.5884 40.4068 13.1875 39.2002 13.2002C37.5442 13.2205 35.963 13.8932 34.8 15.0723L34.288 15.6164L32.5759 17.3764C32.2575 17.6938 31.7423 17.6938 31.4239 17.3764L29.7118 15.6164L29.1997 15.0723C28.0368 13.8932 26.4556 13.2205 24.7995 13.2002C23.5891 13.1966 22.4141 13.609 21.4714 14.3683C20.1247 15.4259 19.2972 17.011 19.1993 18.7205C19.0922 20.4219 19.7081 22.0894 20.8953 23.3127L21.6314 24.0808L31.9999 34.6893L42.4644 24.0808L43.2004 23.3127C44.3528 22.0733 44.9331 20.4077 44.8005 18.7205C44.7116 16.9996 43.8832 15.4012 42.5284 14.3363Z" fill="white" />
      </svg>
    </button>
  );
}

/* ── MenuTrigger (three-dot) ── */
function MenuTrigger({ onClick }) {
  return (
    <button className="pc-menu-trigger" onClick={onClick} aria-label="More options">
      ···
    </button>
  );
}

/* ── HomeDetails ── */
function HomeDetails({ data }) {
  return (
    <span className="pc-home-details">
      {data.map((item, i) => (
        <span key={i} className="pc-home-details__item">
          {i > 0 && <span className="pc-home-details__sep"> | </span>}
          <strong>{item.value}</strong> {item.label}
        </span>
      ))}
    </span>
  );
}

/* ── DataWrapper ── */
function DataWrapper({ children }) {
  return <div className="pc-data-wrapper">{children}</div>;
}

/* ── DataArea ── */
function DataArea({ dataType, children, asChild, lineClamp }) {
  const className = `pc-data-area pc-data-area--${dataType}`;
  if (asChild) return <div className={className}>{children}</div>;
  return <div className={className}>{children}</div>;
}

/* ── ActionArea ── */
function ActionArea({ children }) {
  return <div className="pc-action-area">{children}</div>;
}

/* ── Body (interactive wrapper) ── */
function Body({ interactive, children, onClick, tabIndex, className = '' }) {
  return (
    <div
      className={`pc-body ${interactive ? 'pc-body--interactive' : ''} ${className}`}
      onClick={onClick}
      tabIndex={tabIndex}
      role={interactive ? 'button' : undefined}
    >
      {children}
    </div>
  );
}

/* ── FlexArea ── */
function FlexArea({ children }) {
  return <div className="pc-flex-area">{children}</div>;
}

/* ── Composed PropertyCard (simple API) ── */
function PropertyCard({
  badge,
  data,
  photoBody,
  saveButton,
  actionButton,
  onClick,
  tabIndex,
  elevated,
  interactive,
  photoMode = 'flush',
  children,
  className = '',
}) {
  return (
    <article
      className={`pc-root pc-root--default ${elevated ? 'pc-root--elevated' : ''} ${interactive ? 'pc-root--interactive' : ''} ${className}`}
      onClick={onClick}
      tabIndex={tabIndex}
    >
      <div className={`pc-photo-wrapper pc-photo-wrapper--${photoMode}`}>
        <div className="pc-photo-header">
          <div className="pc-badge-area">{badge}</div>
          <div className="pc-save-area">{saveButton}</div>
        </div>
        <div className="pc-photo-body">{photoBody}</div>
      </div>
      {data && (
        <div className="pc-data-wrapper">
          {data.dataArea1 && <div className="pc-data-area pc-data-area--dataArea1">{data.dataArea1}</div>}
          {data.dataArea2 && <div className="pc-data-area pc-data-area--dataArea2">{data.dataArea2}</div>}
          {data.dataArea3 && <div className="pc-data-area pc-data-area--dataArea3">{data.dataArea3}</div>}
          {data.dataArea4 && <div className="pc-data-area pc-data-area--dataArea4">{data.dataArea4}</div>}
          {data.dataArea5 && <div className="pc-data-area pc-data-area--dataArea5">{data.dataArea5}</div>}
          {actionButton && <div className="pc-action-area">{actionButton}</div>}
        </div>
      )}
      {children}
    </article>
  );
}

/* ── Attach sub-components ── */
PropertyCard.Root = Root;
PropertyCard.Body = Body;
PropertyCard.Photo = Photo;
PropertyCard.PhotoBody = PhotoBody;
PropertyCard.PhotoWrapper = PhotoWrapper;
PropertyCard.PhotoHeader = PhotoHeader;
PropertyCard.Badge = Badge;
PropertyCard.BadgeArea = BadgeArea;
PropertyCard.SaveArea = SaveArea;
PropertyCard.SaveButton = SaveButton;
PropertyCard.MenuTrigger = MenuTrigger;
PropertyCard.HomeDetails = HomeDetails;
PropertyCard.DataWrapper = DataWrapper;
PropertyCard.DataArea = DataArea;
PropertyCard.ActionArea = ActionArea;
PropertyCard.FlexArea = FlexArea;

export { PropertyCard };
export default PropertyCard;
