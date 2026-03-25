

import { PropertyCard, Button, IconButton } from '../constellation';
import { IconGymFilled, IconLaundryFilled, IconPhoneFilled, IconSearchFilled, IconHeartFilled, IconNotificationFilled, IconMailFilled, IconHomesFilled, IconMapFilled, IconSparkleFilled } from '../constellation/Icons';
import './SRPFeed.css';

/* ── Listing data ── */
const LISTINGS = [
  {
    id: 1,
    tier: 'premium',
    badge: '1.5 months free',
    price: '$2,995+',
    priceSuffix: 'Fees may apply',
    floorPlans: '$2,995+ 1 bd | $6,695+ 2 bds | $9,295+ 3 bds',
    address: 'Avara - 1200 Westlake Ave N, Seattle, WA',
    type: 'Apartments for rent',
    amenity: { name: 'Fitness center', rarity: 'Rare in Seattle (9%)', icon: 'gym' },
    photo: '/listing-photo.png',
    color: '#7B6B5F',
    dots: 5,
  },
  {
    id: 2,
    tier: 'base',
    badge: '17 available units',
    price: '$1,800+',
    priceSuffix: 'Fees may apply',
    floorPlans: '$1,800+ 1 bd | $2,400+ 2 bds',
    address: 'Summit Ridge - 520 Westlake Ave, Seattle, WA',
    type: 'Apartments for rent',
    amenity: null,
    photo: '/listing-photo-2.jpg',
    color: '#6B7B8B',
    dots: 3,
  },
  {
    id: 3,
    tier: 'premium',
    badge: 'Concession',
    price: '$3,299+',
    priceSuffix: '1bd',
    floorPlans: '$3,299+ 1 bd | $4,000+ 2 bds | $4,000+ 3 bds',
    address: 'The Ellison - 885 Horizon St, Seattle, WA',
    type: 'Apartments for rent',
    amenity: { name: 'In-unit laundry', rarity: 'Rare in Seattle (12%)', icon: 'laundry' },
    photo: '/listing-photo-3.png',
    color: '#8B7B6B',
    dots: 4,
  },
  {
    id: 4,
    tier: 'base',
    badge: null,
    price: '$1,875+',
    priceSuffix: 'Studio',
    floorPlans: '$1,875+ Studio | $2,200+ 1 bd',
    address: 'The Meridian - 410 Bell St, Seattle, WA',
    type: 'Apartments for rent',
    amenity: null,
    photo: '/listing-photo-4.png',
    color: '#5B6B7B',
    dots: 3,
  },
];

function lighten(hex, amt) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (n >> 16) + amt);
  const g = Math.min(255, ((n >> 8) & 0xff) + amt);
  const b = Math.min(255, (n & 0xff) + amt);
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
}

/* ── Photo placeholder with gradient ── */
function PhotoPlaceholder({ color, aspectClass }) {
  return (
    <div
      className={`photo-ph ${aspectClass}`}
      style={{
        background: `linear-gradient(170deg, ${color} 0%, ${lighten(color, 25)} 50%, ${lighten(color, 45)} 100%)`
      }}
    />
  );
}

/* ── Carousel pagination (matches PaginationBottom.svg) ── */
function Dots({ count }) {
  return (
    <div className="pagination">
      <div className="pagination__pill">
        {Array.from({ length: count }, (_, i) => {
          const isActive = i === 0;
          const isLast = i === count - 1;
          const r = isActive ? 4 : isLast ? 2 : 3;
          return (
            <span
              key={i}
              className="pagination__dot"
              style={{
                width: r * 2,
                height: r * 2,
                background: isActive ? '#F7F7F7' : 'rgba(255,255,255,0.6)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ── Phone icon SVG ── */
const PhoneIcon = () => <IconPhoneFilled size={20} color="#4F4F4F" />;

/* ═══════════════════════════════
   CURRENT DESIGN CARD
   Matches the screenshot exactly
   ═══════════════════════════════ */
function CurrentCard({ listing }) {
  const aspectClass = 'aspect-16-9';

  return (
    <div className="card-wrap">
      <PropertyCard
        interactive
        photoMode="inset"
        badge={listing.badge ? (
          <PropertyCard.Badge tone="notify">{listing.badge}</PropertyCard.Badge>
        ) : undefined}
        saveButton={<PropertyCard.SaveButton />}
        photoBody={
          <>
            {listing.photo
              ? <img src={listing.photo} alt={listing.address} className={`photo-img ${aspectClass}`} />
              : <PhotoPlaceholder color={listing.color} aspectClass={aspectClass} />
            }
            <Dots count={listing.dots} />
          </>
        }
        data={{
          dataArea1: (
            <>
              <span className="price-val">{listing.price}</span>
              <span className="price-suf">{listing.priceSuffix}</span>
              <PropertyCard.MenuTrigger onClick={e => e.stopPropagation()} />
            </>
          ),
          dataArea2: listing.floorPlans,
          dataArea3: listing.address,
          dataArea4: listing.type,
        }}
      >
        {/* Amenity + CTA below data */}
        <div className="card-extra">
          {listing.amenity && (
            <div className="amenity">
              {listing.amenity.icon === 'laundry' ? <IconLaundryFilled size={16} color="#535364" /> : <IconGymFilled size={16} color="#535364" />}
              <span className="amenity__name">{listing.amenity.name}</span>
              <span className="amenity__rare">· {listing.amenity.rarity}</span>
            </div>
          )}
          <div className="cta-row">
            <IconButton title="Call" tone="neutral" emphasis="outlined" size="md" shape="circle">
              <PhoneIcon />
            </IconButton>
            <Button tone="brand" emphasis="filled" size="md" fluid>
              Check availability
            </Button>
          </div>
        </div>
      </PropertyCard>
    </div>
  );
}

/* ═══════════════════════════════
   PROPOSED DESIGN CARD
   Taller media for Premium+
   ═══════════════════════════════ */
function ProposedCard({ listing }) {
  const isPremium = listing.tier === 'premium';
  const aspectClass = isPremium ? 'aspect-tall' : 'aspect-16-9';

  return (
    <div className={`card-wrap ${isPremium ? 'card-wrap--premium' : ''}`}>
      <PropertyCard
        interactive
        photoMode="inset"
        badge={listing.badge ? (
          <PropertyCard.Badge tone="notify">{listing.badge}</PropertyCard.Badge>
        ) : undefined}
        saveButton={<PropertyCard.SaveButton />}
        photoBody={
          <>
            {listing.photo
              ? <img src={listing.photo} alt={listing.address} className={`photo-img ${aspectClass}`} />
              : <PhotoPlaceholder color={listing.color} aspectClass={aspectClass} />
            }
            <Dots count={listing.dots} />
          </>
        }
        data={{
          dataArea1: (
            <>
              <span className="price-val">{listing.price}</span>
              <span className="price-suf">{listing.priceSuffix}</span>
            </>
          ),
          dataArea2: listing.floorPlans,
          dataArea3: listing.address,
        }}
      >
        <div className="card-extra">
          {listing.amenity && (
            <div className="amenity">
              {listing.amenity.icon === 'laundry' ? <IconLaundryFilled size={16} color="#535364" /> : <IconGymFilled size={16} color="#535364" />}
              <span className="amenity__name">{listing.amenity.name}</span>
              <span className="amenity__rare">· {listing.amenity.rarity}</span>
            </div>
          )}
          {listing.amenity && (
            <div className="text-cta">Check availability</div>
          )}
        </div>
      </PropertyCard>
    </div>
  );
}

/* ═══════════════════════════════
   SRP FEED
   ═══════════════════════════════ */
export default function SRPFeed({ view = 'proposed' }) {
  return (
    <div className="srp">
      {/* Search */}
      <div className="srp-search">
        <div className="srp-search__bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
          <span className="srp-search__text">Home feature, school...</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: 'auto' }}><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /></svg>
        </div>
        <button className="srp-search__filter">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /><circle cx="8" cy="6" r="2" fill="currentColor" /><circle cx="16" cy="12" r="2" fill="currentColor" /><circle cx="10" cy="18" r="2" fill="currentColor" /></svg>
        </button>
      </div>
      <div className="srp-pills">
        <span className="srp-pill">Sort: Default</span>
        <span className="srp-pill">Save search</span>
      </div>

      {/* Feed */}
      <div className="srp-feed">
        {LISTINGS.map(listing => (
          view === 'current'
            ? <CurrentCard key={listing.id} listing={listing} />
            : <ProposedCard key={listing.id} listing={listing} />
        ))}
        <p className="srp-note">
          {view === 'proposed'
            ? 'Premium+ cards: taller images (3:2.8) vs base (16:9)'
            : 'Current design — all cards use 16:9 regardless of tier'}
        </p>
      </div>

      {/* Map — fixed position above nav */}
      <div className="srp-map-anchor">
        <button className="srp-map">
          <IconMapFilled size={18} color="#111116" />
          Map
        </button>
      </div>

      {/* Nav */}
      <nav className="srp-nav">
        <div className="srp-nav__item srp-nav__item--on">
          <IconSearchFilled size={28} color="#0041D9" />
          Search
        </div>
        <div className="srp-nav__item">
          <IconNotificationFilled size={28} color="#7E7F8E" />
          Updates
        </div>
        <div className="srp-nav__item">
          <IconHeartFilled size={28} color="#7E7F8E" />
          Saved Homes
        </div>
        <div className="srp-nav__item">
          <IconHomesFilled size={28} color="#7E7F8E" />
          Home Loans
        </div>
        <div className="srp-nav__item">
          <IconMailFilled size={28} color="#7E7F8E" />
          Inbox
        </div>
      </nav>
    </div>
  );
}
