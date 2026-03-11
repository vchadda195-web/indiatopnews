import { useState, useEffect, useCallback, useRef } from "react";

// ─── Google Fonts ───────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --bg: #0A0A0F;
      --bg2: #12121A;
      --bg3: #1A1A26;
      --surface: #1E1E2E;
      --surface2: #252538;
      --border: rgba(255,255,255,0.07);
      --border2: rgba(255,255,255,0.12);
      --text: #E8E6F0;
      --text2: #A8A4C0;
      --text3: #6B6785;
      --accent: #7C6AF7;
      --accent2: #9B8FF9;
      --accent-glow: rgba(124,106,247,0.25);
      --gold: #F4A942;
      --gold-dim: rgba(244,169,66,0.15);
      --red: #FF5470;
      --green: #36D399;
      --cyan: #22D3EE;
      --serif: 'Playfair Display', Georgia, serif;
      --sans: 'DM Sans', system-ui, sans-serif;
      --mono: 'DM Mono', monospace;
      --radius: 12px;
      --radius-lg: 20px;
      --shadow: 0 4px 24px rgba(0,0,0,0.4);
      --shadow-lg: 0 12px 48px rgba(0,0,0,0.6);
    }

    [data-theme="light"] {
      --bg: #F8F7FF;
      --bg2: #EFEDFC;
      --bg3: #E8E5FA;
      --surface: #FFFFFF;
      --surface2: #F3F1FF;
      --border: rgba(0,0,0,0.07);
      --border2: rgba(0,0,0,0.12);
      --text: #1A1830;
      --text2: #4A4570;
      --text3: #8B87B0;
      --accent: #6C5CE7;
      --accent2: #8B7EF0;
      --accent-glow: rgba(108,92,231,0.15);
      --gold: #D97706;
      --gold-dim: rgba(217,119,6,0.1);
      --shadow: 0 4px 24px rgba(0,0,0,0.08);
      --shadow-lg: 0 12px 48px rgba(0,0,0,0.15);
    }

    body { font-family: var(--sans); background: var(--bg); color: var(--text); line-height: 1.6; }
    
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg2); }
    ::-webkit-scrollbar-thumb { background: var(--surface2); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--accent); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    @keyframes slideIn {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .fade-up { animation: fadeUp 0.5s ease forwards; }
    .fade-in { animation: fadeIn 0.4s ease forwards; }

    .skeleton {
      background: linear-gradient(90deg, var(--surface) 25%, var(--surface2) 50%, var(--surface) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }

    .glow-text {
      background: linear-gradient(135deg, var(--accent2), var(--gold));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .card-hover {
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }
    .card-hover:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
      border-color: var(--border2) !important;
    }

    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 20px; border-radius: 8px; border: none;
      font-family: var(--sans); font-size: 14px; font-weight: 500;
      cursor: pointer; transition: all 0.2s ease; text-decoration: none;
      white-space: nowrap;
    }
    .btn-primary {
      background: var(--accent); color: white;
    }
    .btn-primary:hover { background: var(--accent2); transform: translateY(-1px); box-shadow: 0 4px 12px var(--accent-glow); }
    .btn-ghost {
      background: transparent; color: var(--text2); border: 1px solid var(--border);
    }
    .btn-ghost:hover { background: var(--surface); color: var(--text); border-color: var(--border2); }
    .btn-gold {
      background: var(--gold); color: #000;
    }
    .btn-gold:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .btn-sm { padding: 6px 14px; font-size: 13px; }
    .btn-lg { padding: 14px 28px; font-size: 16px; }

    .tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 3px 10px; border-radius: 20px; font-size: 11px;
      font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
      font-family: var(--sans);
    }
    .tag-accent { background: var(--accent-glow); color: var(--accent2); border: 1px solid rgba(124,106,247,0.2); }
    .tag-gold { background: var(--gold-dim); color: var(--gold); border: 1px solid rgba(244,169,66,0.2); }
    .tag-red { background: rgba(255,84,112,0.1); color: var(--red); border: 1px solid rgba(255,84,112,0.2); }
    .tag-green { background: rgba(54,211,153,0.1); color: var(--green); border: 1px solid rgba(54,211,153,0.2); }
    .tag-cyan { background: rgba(34,211,238,0.1); color: var(--cyan); border: 1px solid rgba(34,211,238,0.2); }

    input, textarea, select {
      background: var(--surface); border: 1px solid var(--border);
      color: var(--text); font-family: var(--sans); font-size: 14px;
      border-radius: 8px; padding: 10px 14px;
      transition: border-color 0.2s ease;
      outline: none; width: 100%;
    }
    input:focus, textarea:focus, select:focus {
      border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow);
    }
    input::placeholder, textarea::placeholder { color: var(--text3); }

    .divider { height: 1px; background: var(--border); margin: 24px 0; }
    
    .spinner {
      width: 20px; height: 20px; border: 2px solid var(--border2);
      border-top-color: var(--accent); border-radius: 50%;
      animation: spin 0.7s linear infinite; display: inline-block;
    }

    /* Prose styles for blog content */
    .prose { font-size: 17px; line-height: 1.8; color: var(--text); }
    .prose h1 { font-family: var(--serif); font-size: 2.2rem; font-weight: 700; margin: 1.5rem 0 1rem; color: var(--text); line-height: 1.2; }
    .prose h2 { font-family: var(--serif); font-size: 1.6rem; font-weight: 600; margin: 2rem 0 0.75rem; color: var(--text); line-height: 1.3; }
    .prose h3 { font-family: var(--serif); font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 0.5rem; color: var(--text2); }
    .prose p { margin-bottom: 1.2rem; }
    .prose ul, .prose ol { margin: 1rem 0 1rem 1.5rem; }
    .prose li { margin-bottom: 0.5rem; }
    .prose strong { color: var(--text); font-weight: 600; }
    .prose em { font-style: italic; color: var(--text2); }
    .prose blockquote {
      border-left: 3px solid var(--accent); margin: 1.5rem 0;
      padding: 0.75rem 1.25rem; background: var(--surface);
      border-radius: 0 8px 8px 0; color: var(--text2); font-style: italic;
    }
    .prose code {
      font-family: var(--mono); font-size: 0.85em;
      background: var(--surface); padding: 2px 6px; border-radius: 4px;
      color: var(--accent2);
    }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
    
    @media (max-width: 1024px) {
      .grid-4 { grid-template-columns: repeat(2, 1fr); }
      .grid-3 { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
      .hide-mobile { display: none !important; }
    }
  `}</style>
);

// ─── Gradient Fallback Image ─────────────────────────────────────────────────
const GRADIENTS = [
  "linear-gradient(135deg,#7C6AF7 0%,#F4A942 100%)",
  "linear-gradient(135deg,#22D3EE 0%,#7C6AF7 100%)",
  "linear-gradient(135deg,#36D399 0%,#22D3EE 100%)",
  "linear-gradient(135deg,#F4A942 0%,#FF5470 100%)",
  "linear-gradient(135deg,#FF5470 0%,#7C6AF7 100%)",
  "linear-gradient(135deg,#7C6AF7 0%,#36D399 100%)",
  "linear-gradient(135deg,#22D3EE 0%,#F4A942 100%)",
  "linear-gradient(135deg,#36D399 0%,#FF5470 100%)",
];
const ICONS = ["🤖","💻","🔬","💰","🏥","🚀","🔗","🧠"];

const Img = ({ src, alt, style, seed = 0 }) => {
  const [status, setStatus] = useState("loading");
  const idx = (typeof seed === "number" ? seed : 0) % GRADIENTS.length;
  const isSmall = style && (parseInt(style.width) < 80 || parseInt(style.height) < 80);

  if (status === "failed" || !src) {
    return (
      <div style={{ ...style, background: GRADIENTS[idx], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: style?.flexShrink }}>
        <span style={{ fontSize: isSmall ? 22 : 48, opacity: 0.85 }}>{ICONS[idx]}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt || ""}
      style={{ ...style, display: status === "loading" ? "none" : undefined }}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("failed")}
    />
  );
};

// ─── Mock Data ──────────────────────────────────────────────────────────────
const CATEGORIES = ["Culture", "World", "Health", "Business", "Science", "Technology", "Finance", "AI & ML"];
const CATEGORY_COLORS = {
  "Technology": "accent", "AI & ML": "gold", "Business": "cyan",
  "Science": "green", "Health": "red", "Finance": "cyan",
  "World": "accent", "Culture": "gold"
};

// Real picsum.photos URLs — actual Unsplash photographs, reliable, no CORS
const P = (n) => `https://picsum.photos/seed/${n}/800/500`;

const views = ["4.1K","6.3K","8.7K","12.4K","15.9K","19.2K","22.8K","31.5K","44.1K","52.3K","7.6K","9.9K","11.2K","3.8K","18.5K","27.3K","36.2K","41.7K","5.5K","14.8K"];
const readTimes = ["4 min","5 min","6 min","7 min","8 min","9 min","10 min","6 min","5 min","7 min"];
const dates = ["Mar 11, 2025","Mar 10, 2025","Mar 9, 2025","Mar 8, 2025","Mar 7, 2025","Mar 6, 2025","Mar 5, 2025","Mar 4, 2025","Mar 3, 2025","Mar 2, 2025"];

const MOCK_POSTS = [
  { id:1,   title:"Hawa Mahal: The Complete Guide to Jaipur's Iconic Palace of Winds",                         category:"Culture",     readTime:readTimes[0], views:views[0],  date:dates[0], featured:true,  excerpt:"The Hawa Mahal, or Palace of Winds, is Jaipur's most photographed monument. Built in 1799 by Maharaja Sawai Pratap Singh, its 953 latticed windows were designed so royal ladies could observe street life unseen.",         tags:["Hawa Mahal","Jaipur","Rajasthan","Heritage"],        image:P("jaipur1") },
  { id:2,   title:"Amber Fort: A Step-by-Step Visitor's Guide to Jaipur's Greatest Fortress",                  category:"Culture",     readTime:readTimes[1], views:views[1],  date:dates[0], featured:true,  excerpt:"Perched on the Aravalli Hills, Amber Fort is a stunning blend of Rajput and Mughal architecture.",                                                                                                                          tags:["Amber Fort","Jaipur","Tourism","Fort"],              image:P("amberfort2") },
  { id:3,   title:"City Palace Jaipur: History, Architecture and Everything You Need to Know",                  category:"Culture",     readTime:readTimes[2], views:views[2],  date:dates[0], featured:false, excerpt:"The City Palace complex in the heart of Jaipur is a magnificent testament to Rajput and Mughal craftsmanship.",                                                                                                               tags:["City Palace","Jaipur","Royal","Architecture"],       image:P("citypalace3") },
  { id:4,   title:"Dal Baati Churma: The Soul of Rajasthani Cuisine Explained",                                 category:"Health",      readTime:readTimes[3], views:views[3],  date:dates[0], featured:false, excerpt:"No trip to Jaipur is complete without tasting Dal Baati Churma — the quintessential Rajasthani dish of hard wheat rolls baked over charcoal.",                                                                                tags:["Food","Rajasthani Cuisine","Dal Baati","Jaipur"],    image:P("dalbaati4") },
  { id:5,   title:"Jaipur in 3 Days: The Ultimate Itinerary for First-Time Visitors",                           category:"World",       readTime:readTimes[4], views:views[4],  date:dates[0], featured:false, excerpt:"Three days in Jaipur is enough to fall completely in love with the Pink City.",                                                                                                                                              tags:["Itinerary","Jaipur","Travel","Pink City"],           image:P("pinkcity5") },
  { id:6,   title:"Nahargarh Fort After Dark: The Best Sunset View in All of Jaipur",                           category:"Culture",     readTime:readTimes[5], views:views[5],  date:dates[1], featured:false, excerpt:"Locals call it the crown jewel of Jaipur's skyline. Nahargarh Fort sits 700 feet above the city.",                                                                                                                          tags:["Nahargarh","Sunset","Jaipur","Fort"],                image:P("nahargarh6") },
  { id:7,   title:"Johri Bazaar Shopping Guide: How to Buy Gemstones Like a Pro in Jaipur",                     category:"Business",    readTime:readTimes[6], views:views[6],  date:dates[1], featured:false, excerpt:"Jaipur is the gemstone capital of the world. Johri Bazaar is where rubies, emeralds, and sapphires are traded daily.",                                                                                                      tags:["Shopping","Gemstones","Johri Bazaar","Jaipur"],      image:P("gems7") },
  { id:8,   title:"Hot Air Balloon Over Jaipur: What to Expect, Cost and Best Time to Fly",                     category:"World",       readTime:readTimes[7], views:views[7],  date:dates[1], featured:false, excerpt:"Floating above Rajasthan's amber-hued landscape as the sun rises over Amber Fort is breathtaking.",                                                                                                                         tags:["Hot Air Balloon","Adventure","Jaipur","Experience"], image:P("balloon8") },
  { id:9,   title:"Jaipur Literature Festival: Asia's Largest Free Literary Event",                              category:"Culture",     readTime:readTimes[8], views:views[8],  date:dates[1], featured:false, excerpt:"Every January, Jaipur transforms into the literary capital of the world with 400,000+ attendees.",                                                                                                                           tags:["JLF","Literature Festival","Jaipur","Culture"],      image:P("litfest9") },
  { id:10,  title:"Jaipur's Blue Pottery: The Art Form That Survived 400 Years",                                category:"Culture",     readTime:readTimes[9], views:views[9],  date:dates[1], featured:false, excerpt:"Jaipur's Blue Pottery is unlike any other craft in India — it uses no clay, no potter's wheel, and no kiln.",                                                                                                                tags:["Blue Pottery","Craft","Jaipur","Heritage"],          image:P("pottery10") },
  { id:11,  title:"Jaipur Metro: Everything You Need to Know About Riding in Style",                             category:"Technology",  readTime:readTimes[0], views:views[10], date:dates[2], featured:false, excerpt:"Jaipur Metro is one of India's fastest-growing urban rail systems.",                                                                                                                                                      tags:["Metro","Transport","Jaipur","Urban"],                image:P("metro11") },
  { id:12,  title:"Laal Maas: Cooking Rajasthan's Fiercest Lamb Curry at Home",                                 category:"Health",      readTime:readTimes[1], views:views[11], date:dates[2], featured:false, excerpt:"Laal Maas — red meat — is Rajasthan's most famous curry, made with dozens of dried Mathania chilies.",                                                                                                                    tags:["Laal Maas","Recipe","Rajasthani","Food"],            image:P("laalmaas12") },
  { id:13,  title:"Jantar Mantar Jaipur: The 18th Century Observatory That Still Works",                         category:"Science",     readTime:readTimes[2], views:views[12], date:dates[2], featured:false, excerpt:"Built in 1734, Jantar Mantar is a UNESCO World Heritage Site containing 19 astronomical instruments.",                                                                                                                    tags:["Jantar Mantar","Astronomy","UNESCO","Jaipur"],       image:P("jantar13") },
  { id:14,  title:"The Best Rooftop Restaurants in Jaipur with Fort Views",                                     category:"Health",      readTime:readTimes[3], views:views[13], date:dates[2], featured:false, excerpt:"Jaipur's rooftop dining scene is as spectacular as its monuments.",                                                                                                                                                      tags:["Restaurants","Rooftop","Dining","Jaipur"],           image:P("rooftop14") },
  { id:15,  title:"Jaipur vs Udaipur: Which Rajasthan City Should You Visit First?",                            category:"World",       readTime:readTimes[4], views:views[14], date:dates[2], featured:false, excerpt:"Jaipur is grand, bustling, and historically rich; Udaipur is romantic, lakeside, and intimate.",                                                                                                                           tags:["Jaipur","Udaipur","Rajasthan","Comparison"],         image:P("udaipur15") },
  { id:16,  title:"Jaipur's Hidden Havelis: 10 Mansions Most Tourists Never See",                               category:"Culture",     readTime:readTimes[5], views:views[15], date:dates[3], featured:false, excerpt:"Beyond Hawa Mahal lie dozens of crumbling, magnificent havelis that few tourists visit.",                                                                                                                                tags:["Havelis","Heritage","Hidden Gems","Jaipur"],         image:P("haveli16") },
  { id:17,  title:"Elephant Ride or Jeep Safari? Visiting Amber Fort the Ethical Way",                          category:"World",       readTime:readTimes[6], views:views[16], date:dates[3], featured:false, excerpt:"The elephant rides at Amber Fort have long been controversial.",                                                                                                                                                      tags:["Amber Fort","Elephant","Ethics","Tourism"],          image:P("elephant17") },
  { id:18,  title:"Jaipur's Luxury Palace Hotels: Staying Like Maharajas in 2025",                              category:"Business",    readTime:readTimes[7], views:views[17], date:dates[3], featured:false, excerpt:"Jaipur has the highest concentration of palace hotels in the world.",                                                                                                                                                   tags:["Luxury Hotels","Palace","Heritage","Jaipur"],        image:P("rambagh18") },
  { id:19,  title:"Teej Festival Jaipur 2025: Dates, Celebrations and Where to Watch",                          category:"Culture",     readTime:readTimes[8], views:views[18], date:dates[3], featured:false, excerpt:"Teej is Jaipur's most vibrant women's festival celebrated with elaborate processions.",                                                                                                                                  tags:["Teej","Festival","Jaipur","Culture"],                image:P("teej19") },
  { id:20,  title:"Block Printing in Jaipur: A Hands-On Workshop Experience Guide",                             category:"Culture",     readTime:readTimes[9], views:views[19], date:dates[3], featured:false, excerpt:"Jaipur's block printing tradition dates back 500 years.",                                                                                                                                                               tags:["Block Printing","Craft","Workshop","Jaipur"],        image:P("blockprint20") },
  { id:21,  title:"Jaipur Street Food Guide: 20 Dishes You Must Try and Where to Eat Them",                     category:"Health",      readTime:readTimes[0], views:views[0],  date:dates[4], featured:false, excerpt:"Jaipur's street food scene is legendary — from kachori at Rawat Mishtan to pyaz kachori at LMB.",                                                                                                                      tags:["Street Food","Food Guide","Jaipur","Rajasthan"],     image:P("streetfood21") },
  { id:22,  title:"Jaipur's Elephant Village: Inside the Haathigaon Sanctuary",                                 category:"Science",     readTime:readTimes[1], views:views[1],  date:dates[4], featured:false, excerpt:"Haathigaon — elephant village — is home to 100 elephants and their mahouts.",                                                                                                                                          tags:["Elephant Village","Wildlife","Jaipur","Haathigaon"], image:P("haathi22") },
  { id:23,  title:"Gangaur Festival: Jaipur's Celebration of Love and Devotion",                                category:"Culture",     readTime:readTimes[2], views:views[2],  date:dates[4], featured:false, excerpt:"Gangaur is Rajasthan's most important festival for women, celebrating Goddess Gauri.",                                                                                                                                   tags:["Gangaur","Festival","Rajasthan","Jaipur"],           image:P("gangaur23") },
  { id:24,  title:"Jaipur's Textile Scene: From Factory Outlet to Designer Boutique",                           category:"Business",    readTime:readTimes[3], views:views[3],  date:dates[4], featured:false, excerpt:"Jaipur produces more printed fabric than any other Indian city.",                                                                                                                                                      tags:["Textiles","Shopping","Jaipur","Fashion"],            image:P("textile24") },
  { id:25,  title:"Jal Mahal: The Water Palace Floating in Man Sagar Lake",                                     category:"Culture",     readTime:readTimes[4], views:views[4],  date:dates[4], featured:false, excerpt:"Jal Mahal appears to float serenely on Man Sagar Lake with only its top floor visible.",                                                                                                                                tags:["Jal Mahal","Water Palace","Jaipur","Architecture"],  image:P("jalmahal25") },
  { id:26,  title:"Learning to Cook Rajasthani Food: Best Cooking Classes in Jaipur",                           category:"Health",      readTime:readTimes[5], views:views[5],  date:dates[5], featured:false, excerpt:"Take home more than souvenirs — learn to make dal baati, ker sangri, and ghevar.",                                                                                                                                       tags:["Cooking Class","Rajasthani Food","Jaipur","Experience"], image:P("cooking26") },
  { id:27,  title:"The Pink City's Best Kept Secret: Panna Meena ka Kund Stepwell",                             category:"Culture",     readTime:readTimes[6], views:views[6],  date:dates[5], featured:false, excerpt:"Panna Meena ka Kund is one of India's most photogenic stepwells near Amber Fort.",                                                                                                                                     tags:["Stepwell","Architecture","Hidden Gem","Jaipur"],     image:P("stepwell27") },
  { id:28,  title:"Jaipur's Gems and Jewellery Industry: A ₹50,000 Crore Empire",                              category:"Business",    readTime:readTimes[7], views:views[7],  date:dates[5], featured:false, excerpt:"Jaipur is responsible for 90% of India's coloured gemstone exports.",                                                                                                                                                   tags:["Gems","Business","Exports","Jaipur"],                image:P("gemfactory28") },
  { id:29,  title:"Yoga and Wellness Retreats in Jaipur: Finding Peace in the Pink City",                       category:"Health",      readTime:readTimes[8], views:views[8],  date:dates[5], featured:false, excerpt:"Beyond forts and festivals, Jaipur has a thriving wellness culture.",                                                                                                                                                   tags:["Yoga","Wellness","Spa","Jaipur"],                    image:P("yoga29") },
  { id:30,  title:"Jaipur's Nightlife: Where the Pink City Comes Alive After Dark",                             category:"Culture",     readTime:readTimes[9], views:views[9],  date:dates[5], featured:false, excerpt:"After dark, Jaipur's old city transforms with rooftop bars and live folk music.",                                                                                                                                        tags:["Nightlife","Bars","Jaipur","Evening"],               image:P("nightlife30") },
  { id:31,  title:"Rajmahal Palace: Jaipur's Royal Residence Turned Iconic Hotel",                              category:"Business",    readTime:readTimes[0], views:views[10], date:dates[6], featured:false, excerpt:"Built in 1729 and converted into a Taj hotel, Rajmahal Palace is where royalty once met foreign dignitaries.",                                                                                                           tags:["Rajmahal Palace","Heritage Hotel","Jaipur","Luxury"], image:P("rajmahal31") },
  { id:32,  title:"The Story of Jaipur's Pink Colour: Why Is the City Actually Pink?",                          category:"Culture",     readTime:readTimes[1], views:views[11], date:dates[6], featured:false, excerpt:"In 1876, Maharaja Ram Singh ordered all buildings painted pink to welcome Prince Albert.",                                                                                                                                tags:["Pink City","History","Jaipur","Architecture"],       image:P("pinkwall32") },
  { id:33,  title:"Jaipur's Best Cafes for Remote Workers and Digital Nomads",                                  category:"Technology",  readTime:readTimes[2], views:views[12], date:dates[6], featured:false, excerpt:"With fast Wi-Fi and heritage ambience, Jaipur is quietly becoming one of India's best cities for remote work.",                                                                                                          tags:["Digital Nomad","Cafe","Remote Work","Jaipur"],       image:P("cafe33") },
  { id:34,  title:"Anokhi Museum of Hand Printing: Jaipur's Best Kept Textile Secret",                          category:"Culture",     readTime:readTimes[3], views:views[13], date:dates[6], featured:false, excerpt:"Housed in a beautifully restored haveli in Amber, Anokhi Museum tells the complete story of block printing.",                                                                                                             tags:["Anokhi","Museum","Textiles","Jaipur"],               image:P("anokhi34") },
  { id:35,  title:"Kite Festival Makar Sankranti: Jaipur's Sky Explodes with Colour",                           category:"Culture",     readTime:readTimes[4], views:views[14], date:dates[6], featured:false, excerpt:"Every January 14th, Jaipur's sky becomes a canvas of ten thousand kites.",                                                                                                                                             tags:["Kite Festival","Makar Sankranti","Jaipur","Culture"], image:P("kites35") },
  { id:36,  title:"Birla Mandir Jaipur: The White Marble Temple You Cannot Miss",                               category:"Culture",     readTime:readTimes[5], views:views[15], date:dates[7], featured:false, excerpt:"Built entirely from white Makrana marble, Birla Mandir glows luminously at night.",                                                                                                                                    tags:["Birla Mandir","Temple","Jaipur","Marble"],           image:P("birla36") },
  { id:37,  title:"Jaipur's Art Galleries: The Contemporary Scene in a Historic City",                          category:"Culture",     readTime:readTimes[6], views:views[16], date:dates[7], featured:false, excerpt:"Jaipur's art scene is exploding — a new generation of artists is creating bold contemporary work.",                                                                                                                      tags:["Art","Gallery","Contemporary","Jaipur"],             image:P("artgallery37") },
  { id:38,  title:"Cycle Rickshaw Tour of Old Jaipur: The Best Way to See the Walled City",                     category:"World",       readTime:readTimes[7], views:views[17], date:dates[7], featured:false, excerpt:"The 300-year-old walled city of Jaipur is best experienced at rickshaw pace.",                                                                                                                                        tags:["Rickshaw","Old City","Jaipur","Walking Tour"],       image:P("rickshaw38") },
  { id:39,  title:"Ghevar: Jaipur's Iconic Disc-Shaped Sweet Explained",                                        category:"Health",      readTime:readTimes[8], views:views[18], date:dates[7], featured:false, excerpt:"Ghevar is Rajasthan's most beloved mithai — a crispy honey-combed disc topped with rabri and saffron.",                                                                                                                 tags:["Ghevar","Sweet","Rajasthani","Food"],                image:P("ghevar39") },
  { id:40,  title:"Day Trip from Jaipur to Bhangarh Fort: India's Most Haunted Ruins",                          category:"World",       readTime:readTimes[9], views:views[19], date:dates[7], featured:false, excerpt:"Three hours from Jaipur lies Bhangarh — a 17th-century abandoned fort so notoriously haunted.",                                                                                                                         tags:["Bhangarh","Day Trip","Haunted","Jaipur"],            image:P("bhangarh40") },
  { id:41,  title:"Jaipur's Leather Craft: From Juttis to Designer Footwear",                                   category:"Culture",     readTime:readTimes[0], views:views[0],  date:dates[8], featured:false, excerpt:"Mojaris and juttis — the embroidered leather shoes of Rajasthan — are handcrafted in Jaipur.",                                                                                                                           tags:["Juttis","Leather Craft","Shopping","Jaipur"],        image:P("juttis41") },
  { id:42,  title:"Albert Hall Museum: Jaipur's Grand Rajputana Collection",                                    category:"Culture",     readTime:readTimes[1], views:views[1],  date:dates[8], featured:false, excerpt:"Albert Hall Museum holds an extraordinary collection of carpets, ivory work, and crystal.",                                                                                                                                tags:["Albert Hall","Museum","Jaipur","Collection"],        image:P("albert42") },
  { id:43,  title:"Jaipur's Sustainable Tourism Movement: How the Pink City is Going Green",                    category:"Science",     readTime:readTimes[2], views:views[2],  date:dates[8], featured:false, excerpt:"From solar-powered hotels to plastic-free bazaars, Jaipur is building an ambitious sustainable ecosystem.",                                                                                                              tags:["Sustainable Tourism","Green","Jaipur","Eco"],        image:P("ecogreen43") },
  { id:44,  title:"Jaipur's Perfume Bazaar: The Ancient Art of Attar Making",                                   category:"Culture",     readTime:readTimes[3], views:views[3],  date:dates[8], featured:false, excerpt:"In the narrow lanes of Jaipur's old city, master attar-makers have been distilling perfumes for centuries.",                                                                                                              tags:["Attar","Perfume","Bazaar","Jaipur"],                 image:P("attar44") },
  { id:45,  title:"Monsoon Magic: Why Jaipur Is Most Beautiful in July and August",                             category:"World",       readTime:readTimes[4], views:views[4],  date:dates[8], featured:false, excerpt:"The rain-washed pink facades, mist-cloaked Aravalli hills, and lush green landscape make monsoon Jaipur special.",                                                                                                      tags:["Monsoon","Season","Jaipur","Travel Tips"],           image:P("monsoon45") },
  { id:46,  title:"Samode Village: The Perfect Fairytale Day Trip from Jaipur",                                 category:"World",       readTime:readTimes[5], views:views[5],  date:dates[9], featured:false, excerpt:"An hour north of Jaipur, Samode Village is home to the 475-year-old Samode Palace.",                                                                                                                                    tags:["Samode","Day Trip","Palace","Jaipur"],               image:P("samode46") },
  { id:47,  title:"Jaipur's Miniature Painting: Inside the Living Art Tradition",                               category:"Culture",     readTime:readTimes[6], views:views[6],  date:dates[9], featured:false, excerpt:"Jaipur's miniature painting school continues with living masters using squirrel-hair brushes.",                                                                                                                              tags:["Miniature Painting","Art","Rajput","Jaipur"],        image:P("miniature47") },
  { id:48,  title:"Jaipur's Food Heritage Trail: Restaurants Open for 100+ Years",                              category:"Health",      readTime:readTimes[7], views:views[7],  date:dates[9], featured:false, excerpt:"LMB, Rawat Mishtan Bhandar, and Niro's have been feeding Jaipur for over a century.",                                                                                                                                   tags:["Heritage Restaurants","Old Jaipur","Food","History"], image:P("lmb48") },
  { id:49,  title:"Rambagh Palace: Inside Jaipur's Most Legendary Palace Hotel",                                category:"Business",    readTime:readTimes[8], views:views[8],  date:dates[9], featured:false, excerpt:"Rambagh Palace was the official residence of Maharaja Sawai Man Singh II.",                                                                                                                                             tags:["Rambagh Palace","Taj Hotels","Luxury","Jaipur"],     image:P("rambagh49") },
  { id:50,  title:"Jaipur's Elephant Festival: A Controversial Celebration Revisited",                          category:"Culture",     readTime:readTimes[9], views:views[9],  date:dates[9], featured:false, excerpt:"The Jaipur Elephant Festival — held on Holi — has drawn huge crowds and sharp criticism.",                                                                                                                                tags:["Elephant Festival","Holi","Jaipur","Culture"],       image:P("holi50") },
  { id:51,  title:"Jaipur's Startup Ecosystem: The Pink City's Tech Revolution",                                category:"Technology",  readTime:readTimes[0], views:views[10], date:dates[0], featured:false, excerpt:"Once known only for gems, Jaipur is now home to 500+ startups and five unicorn-track companies.",                                                                                                                        tags:["Startups","Tech","Jaipur","Business"],               image:P("startup51") },
  { id:52,  title:"Govind Dev Ji Temple: Jaipur's Most Sacred and Visited Shrine",                              category:"Culture",     readTime:readTimes[1], views:views[11], date:dates[0], featured:false, excerpt:"The Govind Dev Ji Temple in the City Palace complex is Jaipur's most revered religious site.",                                                                                                                          tags:["Govind Dev Ji","Temple","Jaipur","Pilgrimage"],      image:P("govind52") },
  { id:53,  title:"Jaipur's Walled City: Understanding the Grid That Jai Singh II Built",                       category:"Science",     readTime:readTimes[2], views:views[12], date:dates[1], featured:false, excerpt:"Jaipur is one of the world's first planned cities, laid out according to ancient Vastu Shastra principles.",                                                                                                              tags:["Urban Planning","UNESCO","Jaipur","Heritage"],       image:P("aerial53") },
  { id:54,  title:"Kukas Tribal Village: Living With Rajasthan's Indigenous Communities",                        category:"World",       readTime:readTimes[3], views:views[13], date:dates[1], featured:false, excerpt:"On the outskirts of Jaipur, tribal communities maintain traditions that predate the Mughal empire.",                                                                                                                    tags:["Village","Tribal","Homestay","Jaipur"],              image:P("tribal54") },
  { id:55,  title:"Jaipur's Photography Spots: 25 Locations Every Photographer Must Visit",                     category:"Culture",     readTime:readTimes[4], views:views[14], date:dates[1], featured:false, excerpt:"From Panna Meena ka Kund to Bapu Bazaar at sunset, Jaipur is a photographer's paradise.",                                                                                                                              tags:["Photography","Jaipur","Travel","Spots"],             image:P("photo55") },
  { id:56,  title:"Polo in Jaipur: The Sport of Kings at Rambagh Polo Ground",                                  category:"Business",    readTime:readTimes[5], views:views[15], date:dates[2], featured:false, excerpt:"Jaipur's polo pedigree is legendary — the city has produced some of the world's greatest polo players.",                                                                                                                 tags:["Polo","Sport","Jaipur","Royal"],                     image:P("polo56") },
  { id:57,  title:"Jaipur's Rajasthani Thali: The Complete Guide to the Royal Meal",                            category:"Health",      readTime:readTimes[6], views:views[16], date:dates[2], featured:false, excerpt:"A proper Rajasthani thali is a 25-dish feast with dal baati, laal maas, and gatte ki sabzi.",                                                                                                                           tags:["Thali","Rajasthani Food","Restaurant","Jaipur"],     image:P("thali57") },
  { id:58,  title:"Shopping in Bapu Bazaar: Jaipur's Most Colourful Street Market",                             category:"Business",    readTime:readTimes[7], views:views[17], date:dates[2], featured:false, excerpt:"Bapu Bazaar is Jaipur's most beloved shopping street selling bangles, juttis, and fabrics.",                                                                                                                              tags:["Bapu Bazaar","Shopping","Market","Jaipur"],          image:P("bapu58") },
  { id:59,  title:"Jaipur's Heritage Walks: Five Curated Routes Through the Old City",                          category:"World",       readTime:readTimes[8], views:views[18], date:dates[2], featured:false, excerpt:"Walking Jaipur's walled city reveals layers of history invisible from a car window.",                                                                                                                                  tags:["Heritage Walk","Old City","Jaipur","Tourism"],       image:P("walk59") },
  { id:60,  title:"Diwali in Jaipur: The Festival of Lights Illuminates the Pink City",                         category:"Culture",     readTime:readTimes[9], views:views[19], date:dates[2], featured:false, excerpt:"Diwali transforms Jaipur into a fairyland with thousands of clay lamps outlining City Palace.",                                                                                                                         tags:["Diwali","Festival","Jaipur","Lights"],               image:P("diwali60") },
  { id:61,  title:"Jaipur's Forgotten Railway Heritage: Stations and Steam Trains",                             category:"Culture",     readTime:readTimes[0], views:views[0],  date:dates[3], featured:false, excerpt:"Jaipur Junction is one of India's oldest railway stations and heritage steam trains still wind through Rajasthan.",                                                                                                     tags:["Railway","Heritage","Jaipur","Train"],               image:P("train61") },
  { id:62,  title:"Galta Ji Monkey Temple: The Sacred Hindu Site Outside Jaipur",                               category:"Culture",     readTime:readTimes[1], views:views[1],  date:dates[3], featured:false, excerpt:"Galta Ji — the monkey temple — is a complex of sacred kunds and temples built into a narrow gorge.",                                                                                                                   tags:["Galta Ji","Monkey Temple","Jaipur","Temple"],        image:P("galta62") },
  { id:63,  title:"Jaipur's Rug and Carpet Industry: How Traditional Dhurries Are Made",                        category:"Business",    readTime:readTimes[2], views:views[2],  date:dates[3], featured:false, excerpt:"Rajasthan produces some of the world's finest hand-knotted carpets and flat-woven dhurries.",                                                                                                                           tags:["Carpets","Dhurries","Craft","Jaipur"],               image:P("carpet63") },
  { id:64,  title:"Jaipur Real Estate Boom: Why Investors Are Flocking to the Pink City",                       category:"Finance",     readTime:readTimes[3], views:views[3],  date:dates[3], featured:false, excerpt:"Jaipur's property market grew 28% in 2024 driven by IT corridor expansion.",                                                                                                                                          tags:["Real Estate","Investment","Jaipur","Property"],      image:P("realestate64") },
  { id:65,  title:"Chokhi Dhani: Rajasthan's Famous Ethnic Village Resort Reviewed",                            category:"World",       readTime:readTimes[4], views:views[4],  date:dates[3], featured:false, excerpt:"Chokhi Dhani is Jaipur's most famous cultural resort — a recreated Rajasthani village.",                                                                                                                                 tags:["Chokhi Dhani","Village Resort","Culture","Jaipur"],  image:P("chokhi65") },
  { id:66,  title:"Jaipur's International Airport: Routes, Airlines and What's Coming",                         category:"Technology",  readTime:readTimes[5], views:views[5],  date:dates[4], featured:false, excerpt:"Jaipur's Sanganer Airport is undergoing massive expansion to handle 18 million passengers by 2030.",                                                                                                                    tags:["Airport","Aviation","Jaipur","Travel"],              image:P("airport66") },
  { id:67,  title:"Rajasthani Folk Music: The Instruments and Artists Keeping It Alive",                        category:"Culture",     readTime:readTimes[6], views:views[6],  date:dates[4], featured:false, excerpt:"Rajasthan has the richest folk music tradition in India from haunting sarangi to bhopa ballads.",                                                                                                                       tags:["Folk Music","Culture","Rajasthan","Jaipur"],         image:P("music67") },
  { id:68,  title:"Marriage Season in Jaipur: The Grand Indian Wedding Experience",                             category:"Culture",     readTime:readTimes[7], views:views[7],  date:dates[4], featured:false, excerpt:"November to February is wedding season and Jaipur's palace hotels host extravagant celebrations.",                                                                                                                      tags:["Wedding","Marriage","Jaipur","Culture"],             image:P("wedding68") },
  { id:69,  title:"Jaipur's Solar Power Story: Rajasthan's Renewable Energy Capital",                           category:"Science",     readTime:readTimes[8], views:views[8],  date:dates[4], featured:false, excerpt:"Rajasthan receives more solar radiation than almost anywhere on earth and generates 25% of India's solar power.",                                                                                                       tags:["Solar Energy","Renewable","Rajasthan","Jaipur"],     image:P("solar69") },
  { id:70,  title:"Jaipur's Best Bookshops: Where Literature Meets Royal Heritage",                             category:"Culture",     readTime:readTimes[9], views:views[9],  date:dates[4], featured:false, excerpt:"From Books Corner near MI Road to second-hand stalls in Ramganj Bazaar, Jaipur's literary culture is vibrant.",                                                                                                       tags:["Bookshops","Literature","Jaipur","Culture"],         image:P("books70") },
  { id:71,  title:"The Amber Fort Sound and Light Show: Magic After Dark",                                       category:"Culture",     readTime:readTimes[0], views:views[10], date:dates[5], featured:false, excerpt:"Every evening, Amber Fort's ancient walls come alive with a spectacular sound and light show.",                                                                                                                         tags:["Amber Fort","Sound Light","Jaipur","Night"],         image:P("soundlight71") },
  { id:72,  title:"Jaipur's Water Crisis: Ancient Baolis and Modern Solutions",                                 category:"Science",     readTime:readTimes[1], views:views[11], date:dates[5], featured:false, excerpt:"Jaipur's 300-year-old water infrastructure of baolis and johads managed water brilliantly.",                                                                                                                            tags:["Water","Sustainability","Jaipur","Environment"],     image:P("baoli72") },
  { id:73,  title:"Exploring Jaipur by Night: The Old City Bazaars After 8PM",                                 category:"World",       readTime:readTimes[2], views:views[12], date:dates[5], featured:false, excerpt:"After dark, Jaipur's old city fills with chai wallahs, chaat vendors, and illuminated havelis.",                                                                                                                        tags:["Night","Bazaar","Jaipur","Experience"],              image:P("nightbazaar73") },
  { id:74,  title:"Jaipur's Raj Mandir Cinema: The Most Opulent Movie Theatre in Asia",                         category:"Culture",     readTime:readTimes[3], views:views[13], date:dates[5], featured:false, excerpt:"The Raj Mandir Cinema is a 1,300-seat meringue-pink Baroque movie palace that opened in 1976.",                                                                                                                       tags:["Raj Mandir","Cinema","Jaipur","Bollywood"],          image:P("cinema74") },
  { id:75,  title:"Jaipur's Marwari Business Community: A Legacy of Enterprise",                                category:"Business",    readTime:readTimes[4], views:views[14], date:dates[5], featured:false, excerpt:"The Marwaris of Rajasthan built trading empires stretching from Jaipur to Mumbai to New York.",                                                                                                                         tags:["Marwari","Business","Community","Jaipur"],           image:P("marwari75") },
  { id:76,  title:"Sisodia Rani Garden: Jaipur's Most Romantic Royal Garden",                                   category:"World",       readTime:readTimes[5], views:views[15], date:dates[6], featured:false, excerpt:"Built by Maharaja Jai Singh II for his beloved second wife, Sisodia Rani Garden is a terraced Mughal garden.",                                                                                                        tags:["Garden","Sisodia","Jaipur","Romance"],               image:P("garden76") },
  { id:77,  title:"Jaipur's IT Sector: How the Pink City Became Rajasthan's Silicon Valley",                   category:"Technology",  readTime:readTimes[6], views:views[16], date:dates[6], featured:false, excerpt:"Jaipur's Sitapura and Mahindra World City IT parks now house Infosys, Wipro, HCL, and 200+ tech companies.",                                                                                                          tags:["IT","Tech Park","Jaipur","Silicon Valley"],          image:P("itpark77") },
  { id:78,  title:"Kartik Sagar Lake: Jaipur's Secret Birdwatcher's Paradise",                                 category:"Science",     readTime:readTimes[7], views:views[17], date:dates[6], featured:false, excerpt:"Kartik Sagar hosts 100+ migratory species in winter, including flamingos and painted storks.",                                                                                                                         tags:["Birdwatching","Wildlife","Lake","Jaipur"],           image:P("birds78") },
  { id:79,  title:"Getting from Delhi to Jaipur: Every Transport Option Compared",                              category:"World",       readTime:readTimes[8], views:views[18], date:dates[6], featured:false, excerpt:"Delhi to Jaipur is India's most-travelled tourist corridor. Fly, train, drive, or bus.",                                                                                                                                tags:["Delhi Jaipur","Transport","Travel","Guide"],         image:P("railway79") },
  { id:80,  title:"Jaipur's Haveli Restaurants: Dining in 300-Year-Old Mansions",                              category:"Health",      readTime:readTimes[9], views:views[19], date:dates[6], featured:false, excerpt:"Several havelis have been converted into restaurants where you eat Rajasthani food in frescoed courtyards.",                                                                                                              tags:["Haveli Restaurant","Dining","Jaipur","Heritage"],    image:P("havelires80") },
  { id:81,  title:"Jaipur's Silk Route: Tracing the Fabric That Built an Empire",                               category:"Culture",     readTime:readTimes[0], views:views[0],  date:dates[7], featured:false, excerpt:"For centuries Jaipur was a critical node on the Silk Route where Chinese silk met Indian craftsmanship.",                                                                                                               tags:["Silk Route","History","Textiles","Jaipur"],          image:P("silk81") },
  { id:82,  title:"Jaipur Street Art: The Murals Transforming the Pink City's Walls",                           category:"Culture",     readTime:readTimes[1], views:views[1],  date:dates[7], featured:false, excerpt:"A new generation of street artists is painting Jaipur's walls with murals celebrating Rajasthani heritage.",                                                                                                          tags:["Street Art","Murals","Jaipur","Contemporary"],       image:P("streetart82") },
  { id:83,  title:"Jaipur's Weather Guide: The Best Month to Visit the Pink City",                              category:"World",       readTime:readTimes[2], views:views[2],  date:dates[7], featured:false, excerpt:"Jaipur's climate is extreme — scorching summers, dramatic monsoons, and perfect winters.",                                                                                                                             tags:["Weather","Best Time","Jaipur","Travel Guide"],       image:P("landscape83") },
  { id:84,  title:"Paan in Jaipur: The Ancient Art of Betel Leaf Craft",                                        category:"Health",      readTime:readTimes[3], views:views[3],  date:dates[7], featured:false, excerpt:"The paan shops of Jaipur's old city are an art form — master paan-makers fold betel leaves into masterpieces.",                                                                                                       tags:["Paan","Food Culture","Jaipur","Old City"],           image:P("paan84") },
  { id:85,  title:"Jaipur's Wellness Heritage: Ayurveda, Unani and Traditional Medicine",                       category:"Health",      readTime:readTimes[4], views:views[4],  date:dates[7], featured:false, excerpt:"Jaipur's traditional medicine culture is as old as the city itself with Dawakhanas in the old city.",                                                                                                                  tags:["Ayurveda","Wellness","Traditional Medicine","Jaipur"], image:P("ayurveda85") },
  { id:86,  title:"Sawai Madhopur and Ranthambore: The Tiger Reserve Near Jaipur",                              category:"Science",     readTime:readTimes[5], views:views[5],  date:dates[8], featured:false, excerpt:"Just two hours from Jaipur, Ranthambore National Park is India's most famous tiger reserve with 70+ tigers.",                                                                                                          tags:["Ranthambore","Tiger","Safari","Jaipur"],             image:P("tiger86") },
  { id:87,  title:"Jaipur's Architecture Decoded: From Mughal to Rajput to Colonial",                           category:"Culture",     readTime:readTimes[6], views:views[6],  date:dates[8], featured:false, excerpt:"Jaipur's architecture is a layered palimpsest of Rajput, Mughal, Persian, and British colonial styles.",                                                                                                               tags:["Architecture","Heritage","Jaipur","History"],        image:P("arch87") },
  { id:88,  title:"How to Bargain at Jaipur's Bazaars: The Insider's Guide",                                    category:"Business",    readTime:readTimes[7], views:views[7],  date:dates[8], featured:false, excerpt:"Shopping in Jaipur's bazaars requires a completely different mindset — never accept the first price.",                                                                                                                  tags:["Bargaining","Shopping","Bazaar","Jaipur"],           image:P("bazaar88") },
  { id:89,  title:"Jaipur's Charity and NGO Scene: Change-Makers of the Pink City",                             category:"World",       readTime:readTimes[8], views:views[8],  date:dates[8], featured:false, excerpt:"From rescuing child labourers to preserving dying crafts, Jaipur has a remarkable social innovation ecosystem.",                                                                                                      tags:["NGO","Charity","Social","Jaipur"],                   image:P("ngo89") },
  { id:90,  title:"Rajasthan Tourism: How Jaipur Became India's No. 1 Heritage Destination",                    category:"Business",    readTime:readTimes[9], views:views[9],  date:dates[8], featured:false, excerpt:"Jaipur welcomed 10 million tourists in 2024 — more than any other heritage city in India.",                                                                                                                            tags:["Tourism","Heritage","Jaipur","Economy"],             image:P("tourism90") },
  { id:91,  title:"Jaipur's Clock Tower: The Ghanta Ghar at the Heart of the Old City",                         category:"Culture",     readTime:readTimes[0], views:views[10], date:dates[9], featured:false, excerpt:"The Ghanta Ghar has stood at the intersection of Jaipur's bazaars since 1900.",                                                                                                                                      tags:["Clock Tower","Old City","Jaipur","Bazaar"],          image:P("clock91") },
  { id:92,  title:"Amer Town: The Ancient Capital Before Jaipur Was Built",                                     category:"Culture",     readTime:readTimes[1], views:views[11], date:dates[9], featured:false, excerpt:"Before Jai Singh II founded Jaipur in 1727, Amer was the Kachwaha Rajput capital for 500 years.",                                                                                                                    tags:["Amer","Old Capital","Rajput","Jaipur"],              image:P("amer92") },
  { id:93,  title:"Jaipur's Dargahs: Sufi Shrines in the Heart of Rajasthan",                                  category:"Culture",     readTime:readTimes[2], views:views[12], date:dates[9], featured:false, excerpt:"Jaipur has a rich Islamic heritage, and its dargahs are among the most spiritually powerful sites in Rajasthan.",                                                                                                     tags:["Dargah","Sufi","Islam","Jaipur"],                    image:P("dargah93") },
  { id:94,  title:"Jaipur to Pushkar: Road Trip Through Rajasthan's Sacred Landscape",                          category:"World",       readTime:readTimes[3], views:views[13], date:dates[9], featured:false, excerpt:"The 150km drive from Jaipur to Pushkar winds through temple complexes and desert scrubland.",                                                                                                                          tags:["Road Trip","Pushkar","Jaipur","Rajasthan"],          image:P("pushkar94") },
  { id:95,  title:"Jaipur's Film Industry: Bollywood's Favourite Backdrop",                                     category:"Culture",     readTime:readTimes[4], views:views[14], date:dates[9], featured:false, excerpt:"From Rang De Basanti to Netflix's The Crown, Jaipur has been the setting of countless productions.",                                                                                                                 tags:["Bollywood","Films","Jaipur","Cinema"],               image:P("bollywood95") },
  { id:96,  title:"Jaipur's Dainik Bhaskar Media Group: India's Largest Hindi Newspaper",                       category:"Business",    readTime:readTimes[5], views:views[15], date:dates[0], featured:false, excerpt:"Headquartered in Jaipur, Dainik Bhaskar reaches 53 million readers daily.",                                                                                                                                          tags:["Dainik Bhaskar","Media","Jaipur","Business"],        image:P("media96") },
  { id:97,  title:"Jaipur's Hospitals and Medical Tourism: World-Class Healthcare in the Pink City",             category:"Health",      readTime:readTimes[6], views:views[16], date:dates[0], featured:false, excerpt:"SMS Hospital, Fortis, Manipal, and Narayana — Jaipur's healthcare infrastructure rivals major global cities.",                                                                                                       tags:["Medical Tourism","Healthcare","Jaipur","Hospitals"], image:P("hospital97") },
  { id:98,  title:"Jaipur's Colleges and Universities: Education in the Pink City",                             category:"World",       readTime:readTimes[7], views:views[17], date:dates[1], featured:false, excerpt:"Jaipur is home to IIT Jodhpur, MNIT, and the University of Rajasthan with 400,000+ students.",                                                                                                                       tags:["Education","University","Jaipur","Students"],        image:P("university98") },
  { id:99,  title:"Jaipur's Garment Export Industry: Behind the Label",                                         category:"Business",    readTime:readTimes[8], views:views[18], date:dates[1], featured:false, excerpt:"Jaipur exports over ₹4,000 crore of garments annually to Europe, the US, and Japan.",                                                                                                                                 tags:["Garments","Export","Industry","Jaipur"],             image:P("garment99") },
  { id:100, title:"Why Jaipur Will Be India's Most Exciting City of the Next Decade",                            category:"Technology",  readTime:readTimes[9], views:views[19], date:dates[0], featured:false, excerpt:"Infrastructure investment, a booming startup scene, world-class tourism, and extraordinary cultural heritage — Jaipur is firing on every cylinder.",                                                                tags:["Future","Growth","Jaipur","India"],                  image:P("future100") },
];

const MOCK_NEWS = [
  { id: 1, title: "OpenAI Releases GPT-5 with Unprecedented Reasoning Capabilities", category: "AI & ML", time: "2 hours ago", source: "Tech Review", hot: true },
  { id: 2, title: "Federal Reserve Signals Three Rate Cuts Expected in 2025", category: "Finance", time: "4 hours ago", source: "Financial Times", hot: true },
  { id: 3, title: "SpaceX Starship Successfully Completes First Commercial Lunar Mission", category: "Science", time: "5 hours ago", source: "Space News", hot: false },
  { id: 4, title: "EU Passes Landmark AI Safety Regulation with Global Implications", category: "Technology", time: "6 hours ago", source: "Reuters", hot: true },
  { id: 5, title: "Apple's Vision Pro 2 Leaked Specs Reveal Holographic Display Technology", category: "Technology", time: "7 hours ago", source: "MacRumors", hot: false },
  { id: 6, title: "Scientists Achieve Room-Temperature Superconductivity in New Material", category: "Science", time: "9 hours ago", source: "Nature", hot: true },
  { id: 7, title: "Global Leaders Agree to AI Governance Framework at Geneva Summit", category: "World", time: "11 hours ago", source: "BBC", hot: false },
  { id: 8, title: "Tesla's Autonomous Robot Taxi Fleet Expands to 50 US Cities", category: "Business", time: "12 hours ago", source: "Bloomberg", hot: false },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const CategoryTag = ({ cat, small }) => {
  const color = CATEGORY_COLORS[cat] || "accent";
  return <span className={`tag tag-${color}`} style={{ fontSize: small ? "10px" : "11px" }}>{cat}</span>;
};

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(Math.min(pct, 100));
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "var(--border)", zIndex: 9999 }}>
      <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, var(--accent), var(--gold))", transition: "width 0.1s" }} />
    </div>
  );
};

// ─── Navigation ──────────────────────────────────────────────────────────────
const Nav = ({ page, setPage, theme, setTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navItems = [
    { label: "Home", id: "home" }, { label: "Blog", id: "blog" },
    { label: "News", id: "news" }, { label: "Categories", id: "categories" },
    { label: "Admin", id: "admin" }
  ];

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid var(--border)" : "none",
    transition: "all 0.3s ease",
  };
  if (theme === "light") navStyle.background = scrolled ? "rgba(248,247,255,0.92)" : "transparent";

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", height: 64, gap: 32 }}>
        {/* Logo */}
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--accent), var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
          <span style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 20, color: "var(--text)" }}>NexusAI</span>
          <span style={{ fontSize: 10, color: "var(--accent2)", background: "var(--accent-glow)", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>BETA</span>
        </button>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 4, flex: 1 }} className="hide-mobile">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} className="btn btn-ghost btn-sm"
              style={{ color: page === item.id ? "var(--accent2)" : "var(--text2)", background: page === item.id ? "var(--accent-glow)" : "transparent", borderColor: "transparent" }}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {searchOpen ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, animation: "scaleIn 0.2s ease" }}>
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles..." style={{ width: 220, height: 36 }} autoFocus
                onKeyDown={e => e.key === "Escape" && setSearchOpen(false)} />
              <button className="btn btn-ghost btn-sm" onClick={() => setSearchOpen(false)}>✕</button>
            </div>
          ) : (
            <button className="btn btn-ghost btn-sm" onClick={() => setSearchOpen(true)} title="Search">🔍</button>
          )}
          <button className="btn btn-ghost btn-sm" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button className="btn btn-primary btn-sm hide-mobile" onClick={() => setPage("admin")}>Admin Dashboard</button>
          <button className="btn btn-ghost btn-sm" style={{ display: "none" }} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
      </div>
    </nav>
  );
};

// ─── Hero Section ────────────────────────────────────────────────────────────
const Hero = ({ setPage, setSelectedPost }) => {
  const featured = MOCK_POSTS[0];
  const [typedText, setTypedText] = useState("");
  const phrases = ["50 AI Articles Daily", "Real-Time News Updates", "SEO-Optimized Content", "Powered by Gemini AI"];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIdx];
    const delay = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting && charIdx < currentPhrase.length) {
        setTypedText(currentPhrase.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === currentPhrase.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && charIdx > 0) {
        setTypedText(currentPhrase.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setPhraseIdx(i => (i + 1) % phrases.length);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      {/* Animated gradient background */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(124,106,247,0.3) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(244,169,66,0.15) 0%, transparent 50%), var(--bg)",
      }} />
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px 60px", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={{ animation: "fadeUp 0.7s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--accent-glow)", border: "1px solid rgba(124,106,247,0.3)", borderRadius: 20, padding: "6px 14px", marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", animation: "pulse 2s infinite", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "var(--accent2)", fontWeight: 500 }}>Live — Auto-Publishing</span>
            </div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.5rem,5vw,3.8rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
              AI-Powered News &<br />
              <span className="glow-text">Smart Blog Platform</span>
            </h1>
            <p style={{ fontSize: 18, color: "var(--text2)", marginBottom: 16, lineHeight: 1.7 }}>
              Automatically generating and publishing
            </p>
            <div style={{ fontSize: 22, fontWeight: 600, color: "var(--accent2)", marginBottom: 32, height: 36, display: "flex", alignItems: "center", gap: 4 }}>
              <span>{typedText}</span>
              <span style={{ animation: "blink 1s infinite", color: "var(--gold)" }}>|</span>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-primary btn-lg" onClick={() => setPage("blog")}>
                🚀 Explore Articles
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => setPage("news")}>
                📰 Latest News
              </button>
            </div>
            {/* Stats */}
            <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
              {[["50+", "Daily Articles"], ["10K+", "Monthly Readers"], ["8", "Categories"], ["98%", "AI Accuracy"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontWeight: 700, color: "var(--accent2)" }}>{num}</div>
                  <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured post card */}
          <div style={{ animation: "fadeUp 0.7s 0.2s ease both" }}>
            <div className="card-hover" onClick={() => { setSelectedPost(featured); setPage("post"); }}
              style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", cursor: "pointer" }}>
              <div style={{ position: "relative", height: 260 }}>
                <Img src={featured.image} alt={featured.title} seed={featured.id} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,15,0.9) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", top: 16, left: 16 }}>
                  <CategoryTag cat={featured.category} />
                </div>
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", fontWeight: 700, color: "white", lineHeight: 1.3 }}>{featured.title}</h2>
                </div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <p style={{ fontSize: 14, color: "var(--text2)", marginBottom: 16, lineHeight: 1.6 }}>{featured.excerpt.slice(0, 120)}...</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "var(--text3)" }}>
                  <span>⏱ {featured.readTime} read</span>
                  <span>👁 {featured.views} views</span>
                  <span>📅 {featured.date}</span>
                </div>
              </div>
            </div>
            {/* Small live news tickers */}
            <div style={{ marginTop: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--red)", animation: "pulse 1.5s infinite", display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--red)", textTransform: "uppercase", letterSpacing: 1 }}>Breaking</span>
              </div>
              {MOCK_NEWS.filter(n => n.hot).slice(0, 3).map((news, i) => (
                <div key={news.id} style={{ padding: "8px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none", fontSize: 13, color: "var(--text2)", cursor: "pointer" }}
                  onClick={() => setPage("news")}>
                  <span style={{ color: "var(--text3)", fontSize: 11, display: "block" }}>{news.time}</span>
                  {news.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ post, onSelect, featured }) => (
  <div className="card-hover" onClick={() => onSelect(post)}
    style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: featured ? "row" : "column" }}>
    <div style={{ position: "relative", height: featured ? "100%" : 200, minWidth: featured ? 280 : "auto", flex: featured ? "0 0 280px" : "none" }}>
      <Img src={post.image} alt={post.title} seed={post.id} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", top: 12, left: 12 }}>
        <CategoryTag cat={post.category} small />
      </div>
    </div>
    <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
      <h3 style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: featured ? "1.3rem" : "1.05rem", lineHeight: 1.35, marginBottom: 10, color: "var(--text)" }}>{post.title}</h3>
      <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{post.excerpt.slice(0, featured ? 200 : 110)}...</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
        {post.tags.slice(0, 3).map(tag => (
          <span key={tag} style={{ fontSize: 11, color: "var(--text3)", background: "var(--bg2)", padding: "2px 8px", borderRadius: 4 }}>#{tag}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--text3)", borderTop: "1px solid var(--border)", paddingTop: 12 }}>
        <span>⏱ {post.readTime}</span>
        <span>👁 {post.views}</span>
        <span>📅 {post.date}</span>
        <span style={{ marginLeft: "auto", color: "var(--accent2)", fontWeight: 500 }}>Read →</span>
      </div>
    </div>
  </div>
);

// ─── Home Page ────────────────────────────────────────────────────────────────
const HomePage = ({ setPage, setSelectedPost }) => {
  return (
    <div>
      <Hero setPage={setPage} setSelectedPost={setSelectedPost} />
      
      {/* Latest Articles */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <div className="tag tag-accent" style={{ marginBottom: 10 }}>📝 Latest</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 700 }}>Fresh from the AI</h2>
          </div>
          <button className="btn btn-ghost" onClick={() => setPage("blog")}>View All Articles →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          <BlogCard post={MOCK_POSTS[0]} onSelect={p => { setSelectedPost(p); setPage("post"); }} featured />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {MOCK_POSTS.slice(1, 4).map(post => (
              <div key={post.id} className="card-hover" onClick={() => { setSelectedPost(post); setPage("post"); }}
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 16, cursor: "pointer", display: "flex", gap: 14 }}>
                <Img src={post.image} alt="" seed={post.id} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <CategoryTag cat={post.category} small />
                  <h4 style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", fontWeight: 600, margin: "6px 0 4px", lineHeight: 1.3 }}>{post.title.slice(0, 70)}...</h4>
                  <span style={{ fontSize: 12, color: "var(--text3)" }}>{post.readTime} · {post.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* More articles grid */}
        <div className="grid-4">
          {MOCK_POSTS.slice(4).map(post => (
            <BlogCard key={post.id} post={post} onSelect={p => { setSelectedPost(p); setPage("post"); }} />
          ))}
        </div>
      </section>

      {/* News Ticker */}
      <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "48px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
            <div>
              <div className="tag tag-red" style={{ marginBottom: 10 }}>🔴 Breaking News</div>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 700 }}>Top Stories Today</h2>
            </div>
            <button className="btn btn-ghost" onClick={() => setPage("news")}>All News →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            {MOCK_NEWS.slice(0, 6).map(news => (
              <div key={news.id} className="card-hover" onClick={() => setPage("news")}
                style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 16, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <CategoryTag cat={news.category} small />
                  {news.hot && <span className="tag tag-red" style={{ fontSize: 10 }}>🔥 Hot</span>}
                </div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text)", lineHeight: 1.45, marginBottom: 10 }}>{news.title}</p>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>{news.source} · {news.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 700, marginBottom: 28, textAlign: "center" }}>Explore by Category</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {CATEGORIES.map((cat, i) => {
            const icons = ["💻", "🤖", "💼", "🔬", "🏥", "💰", "🌍", "🎭"];
            const colors = ["var(--accent)", "var(--gold)", "var(--cyan)", "var(--green)", "var(--red)", "var(--cyan)", "var(--accent)", "var(--gold)"];
            return (
              <div key={cat} className="card-hover" onClick={() => setPage("blog")}
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 24, textAlign: "center", cursor: "pointer" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{icons[i]}</div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", marginBottom: 4 }}>{cat}</div>
                <div style={{ fontSize: 12, color: colors[i] }}>{Math.floor(Math.random() * 200 + 50)} articles</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: "linear-gradient(135deg, var(--accent-glow), var(--gold-dim))", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "60px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div className="tag tag-gold" style={{ marginBottom: 16 }}>📬 Newsletter</div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 700, marginBottom: 12 }}>Never Miss a Story</h2>
          <p style={{ color: "var(--text2)", marginBottom: 28 }}>Get 50 AI-curated articles delivered to your inbox every morning. Free, always.</p>
          <div style={{ display: "flex", gap: 12, maxWidth: 440, margin: "0 auto" }}>
            <input placeholder="your@email.com" style={{ flex: 1 }} />
            <button className="btn btn-gold">Subscribe</button>
          </div>
          <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 12 }}>Join 10,000+ readers · No spam · Unsubscribe anytime</p>
        </div>
      </section>
    </div>
  );
};

// ─── Blog Page ─────────────────────────────────────────────────────────────
const BlogPage = ({ setPage, setSelectedPost }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const filtered = MOCK_POSTS.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const total = Math.ceil(filtered.length / postsPerPage);
  const paged = filtered.slice((page - 1) * postsPerPage, page * postsPerPage);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px 60px" }}>
      <div style={{ marginBottom: 40 }}>
        <div className="tag tag-accent" style={{ marginBottom: 12 }}>📚 All Articles</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "2.8rem", fontWeight: 900, marginBottom: 8 }}>The NexusAI Blog</h1>
        <p style={{ color: "var(--text2)", fontSize: 16 }}>50 AI-generated articles published daily. Expert content, zero effort.</p>
      </div>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <input placeholder="🔍 Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ maxWidth: 300 }} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["All", ...CATEGORIES].map(cat => (
            <button key={cat} className="btn btn-ghost btn-sm" onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              style={{ background: activeCategory === cat ? "var(--accent-glow)" : "", color: activeCategory === cat ? "var(--accent2)" : "var(--text2)", borderColor: activeCategory === cat ? "rgba(124,106,247,0.3)" : "var(--border)" }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 24 }}>Showing {paged.length} of {filtered.length} articles</p>

      {/* Grid */}
      <div className="grid-3" style={{ marginBottom: 40 }}>
        {paged.map(post => (
          <BlogCard key={post.id} post={post} onSelect={p => { setSelectedPost(p); setPage("post"); }} />
        ))}
      </div>

      {/* Pagination */}
      {total > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setCurrentPage(p => p - 1)}>← Prev</button>
          {Array.from({ length: total }, (_, i) => i + 1).map(p => (
            <button key={p} className="btn btn-sm" onClick={() => setCurrentPage(p)}
              style={{ background: p === page ? "var(--accent)" : "var(--surface)", color: p === page ? "white" : "var(--text2)", border: "1px solid var(--border)", borderRadius: 8 }}>{p}</button>
          ))}
          <button className="btn btn-ghost btn-sm" disabled={page === total} onClick={() => setCurrentPage(p => p + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
};

// ─── Blog Post Page ──────────────────────────────────────────────────────────
const BlogPostPage = ({ post, setPage }) => {
  const [aiContent, setAiContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    setAiContent("");
    generateContent();
  }, [post]);

  const generateContent = async () => {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Write a high-quality SEO optimized blog post about: "${post.title}"

Requirements:
- 600-800 words (summarized for demo)
- Human-like writing style
- Include H2 and H3 headings
- Include introduction and conclusion
- Add a short FAQ section (2 questions)
- Add bullet points where helpful
- Engaging and informative content
- Target keyword: ${post.tags[0]}

Return ONLY valid HTML using these tags: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, <blockquote>.
No <html>, <head>, <body>, <style> tags. Start directly with content.`
          }]
        })
      });
      const data = await res.json();
      const html = data.content?.[0]?.text || "<p>Content generation failed. Please try again.</p>";
      setAiContent(html);
    } catch {
      setAiContent(`<h2>Introduction</h2><p>${post.excerpt}</p><p>This is a demo preview. Connect your Gemini API key to generate full AI content for every article automatically.</p><h2>Key Insights</h2><ul><li>AI is transforming content creation at scale</li><li>Automated publishing saves hours of editorial work</li><li>SEO optimization is built into every generated post</li></ul><h2>Conclusion</h2><p>The future of content is AI-powered, scalable, and SEO-optimized. NexusAI makes it effortless.</p><h2>FAQ</h2><h3>How does AI generate content?</h3><p>AI models analyze thousands of sources to produce unique, human-like writing on any topic.</p><h3>Is AI content SEO-friendly?</h3><p>Yes — NexusAI automatically optimizes titles, meta descriptions, headings, and keyword density.</p>`);
    } finally {
      setLoading(false);
    }
  };

  const tocHeadings = aiContent.match(/<h[23][^>]*>([^<]+)<\/h[23]>/g)?.map(h => h.replace(/<[^>]+>/g, "")) || [];

  return (
    <div style={{ paddingTop: 64 }}>
      <ReadingProgress />

      {/* Hero */}
      <div style={{ position: "relative", height: 400, overflow: "hidden" }}>
        <Img src={post.image} alt={post.title} seed={post.id} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.85) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 24px", maxWidth: 900, margin: "0 auto" }}>
          <button onClick={() => setPage("blog")} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 13, marginBottom: 16, backdropFilter: "blur(10px)" }}>
            ← Back to Blog
          </button>
          <CategoryTag cat={post.category} />
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800, color: "white", marginTop: 12, lineHeight: 1.25, maxWidth: 800 }}>{post.title}</h1>
          <div style={{ display: "flex", gap: 20, marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
            <span>🤖 AI Writer</span>
            <span>📅 {post.date}</span>
            <span>⏱ {post.readTime}</span>
            <span>👁 {post.views}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 300px", gap: 48 }}>
        {/* Main content */}
        <main>
          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
            {post.tags.map(tag => <span key={tag} className="tag tag-accent">{tag}</span>)}
          </div>

          {/* Article body */}
          <article className="prose">
            <p style={{ fontSize: 18, color: "var(--text2)", marginBottom: 32, fontStyle: "italic", borderLeft: "3px solid var(--gold)", paddingLeft: 16 }}>{post.excerpt}</p>
            {loading ? (
              <div>
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="skeleton" style={{ height: i % 4 === 0 ? 28 : 18, marginBottom: 16, width: i % 3 === 2 ? "70%" : "100%" }} />
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--text3)", fontSize: 14, marginTop: 24 }}>
                  <div className="spinner" /> Generating AI content...
                </div>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: aiContent }} />
            )}
          </article>

          {/* Share */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
            <p style={{ fontWeight: 600, marginBottom: 16 }}>Share this article</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[["🐦 Twitter", "#1DA1F2"], ["💼 LinkedIn", "#0A66C2"], ["📘 Facebook", "#1877F2"], ["🔗 Copy", "var(--surface2)"]].map(([label, bg]) => (
                <button key={label} className="btn btn-sm" style={{ background: label === "🔗 Copy" ? "var(--surface2)" : bg, color: "white", border: "none" }}
                  onClick={() => { if (label === "🔗 Copy") { setCopied(true); setTimeout(() => setCopied(false), 2000); } }}>
                  {label === "🔗 Copy" && copied ? "✓ Copied!" : label}
                </button>
              ))}
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside>
          {/* Table of contents */}
          {tocHeadings.length > 0 && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 20, marginBottom: 24, position: "sticky", top: 80 }}>
              <h4 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>📋 Table of Contents</h4>
              {tocHeadings.map((h, i) => (
                <div key={i} style={{ fontSize: 13, color: "var(--text2)", padding: "6px 0", borderBottom: i < tocHeadings.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer" }}
                  onMouseEnter={e => e.target.style.color = "var(--accent2)"}
                  onMouseLeave={e => e.target.style.color = "var(--text2)"}>
                  {i + 1}. {h}
                </div>
              ))}
            </div>
          )}
          {/* Related */}
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 20 }}>
            <h4 style={{ fontFamily: "var(--serif)", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>📰 Related Articles</h4>
            {MOCK_POSTS.filter(p => p.id !== post.id).slice(0, 4).map(p => (
              <div key={p.id} style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)", cursor: "pointer" }}>
                <Img src={p.image} alt="" seed={p.id} style={{ width: 52, height: 52, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: "var(--text)", lineHeight: 1.4 }}>{p.title.slice(0, 65)}...</p>
                  <span style={{ fontSize: 11, color: "var(--text3)" }}>{p.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

// ─── News Page ────────────────────────────────────────────────────────────────
const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [aiSummary, setAiSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const newsCategories = ["All", "AI & ML", "Technology", "Finance", "Science", "World", "Business"];
  const filtered = MOCK_NEWS.filter(n => activeCategory === "All" || n.category === activeCategory);

  const generateSummary = async (news) => {
    setSelectedNews(news);
    setSummaryLoading(true);
    setAiSummary("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: `Write a 200-word news summary about: "${news.title}". Make it informative and engaging. Include: key facts, context, and implications. Return plain text, no markdown.` }]
        })
      });
      const data = await res.json();
      setAiSummary(data.content?.[0]?.text || "Summary unavailable. Connect API to generate real-time news summaries.");
    } catch {
      setAiSummary("This feature generates AI-powered news summaries using the Gemini API. Connect your API key in the admin dashboard to enable real-time news rewriting and summarization.");
    } finally {
      setSummaryLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 24px 60px" }}>
      <div style={{ marginBottom: 40 }}>
        <div className="tag tag-red" style={{ marginBottom: 12 }}>🔴 Live Updates</div>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: "2.8rem", fontWeight: 900, marginBottom: 8 }}>AI News Aggregator</h1>
        <p style={{ color: "var(--text2)" }}>Trending news rewritten and summarized by AI — updated every hour</p>
      </div>

      {/* Live ticker */}
      <div style={{ background: "var(--red)", borderRadius: "var(--radius)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 16, marginBottom: 32, overflow: "hidden" }}>
        <span style={{ fontWeight: 700, color: "white", flexShrink: 0, fontSize: 13 }}>🔴 BREAKING</span>
        <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, overflow: "hidden", whiteSpace: "nowrap" }}>
          {MOCK_NEWS.filter(n => n.hot).map(n => n.title).join("  ·  ")}
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {newsCategories.map(cat => (
          <button key={cat} className="btn btn-ghost btn-sm" onClick={() => setActiveCategory(cat)}
            style={{ background: activeCategory === cat ? "var(--accent-glow)" : "", color: activeCategory === cat ? "var(--accent2)" : "var(--text2)", borderColor: activeCategory === cat ? "rgba(124,106,247,0.3)" : "var(--border)" }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }}>
        {/* News list */}
        <div>
          {filtered.map((news, i) => (
            <div key={news.id} className="card-hover" onClick={() => generateSummary(news)}
              style={{ background: "var(--surface)", border: `1px solid ${selectedNews?.id === news.id ? "var(--accent)" : "var(--border)"}`, borderRadius: "var(--radius)", padding: 20, marginBottom: 12, cursor: "pointer", animation: `fadeUp ${0.1 + i * 0.05}s ease` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <CategoryTag cat={news.category} small />
                  {news.hot && <span className="tag tag-red" style={{ fontSize: 10 }}>🔥 Trending</span>}
                </div>
                <span style={{ fontSize: 12, color: "var(--text3)" }}>{news.time}</span>
              </div>
              <h3 style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", lineHeight: 1.4, marginBottom: 8 }}>{news.title}</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--text3)" }}>Source: {news.source}</span>
                <span style={{ fontSize: 12, color: "var(--accent2)" }}>Click for AI Summary →</span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Summary panel */}
        <div style={{ position: "sticky", top: 80, height: "fit-content" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, var(--accent), var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>AI News Analyzer</div>
                <div style={{ fontSize: 12, color: "var(--text3)" }}>Powered by Gemini</div>
              </div>
            </div>

            {!selectedNews ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text3)" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>👆</div>
                <p style={{ fontSize: 14 }}>Select a news story to generate an AI-powered summary and analysis</p>
              </div>
            ) : (
              <div>
                <h4 style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 15, marginBottom: 16, color: "var(--text)", lineHeight: 1.4 }}>{selectedNews.title}</h4>
                <div className="divider" />
                {summaryLoading ? (
                  <div>
                    {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 16, marginBottom: 12, width: i % 3 === 2 ? "65%" : "100%" }} />)}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text3)", fontSize: 13, marginTop: 16 }}>
                      <div className="spinner" /> Generating AI summary...
                    </div>
                  </div>
                ) : (
                  <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>{aiSummary}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("admin@nexusai.com");
  const [password, setPassword] = useState("admin123");
  const [activeTab, setActiveTab] = useState("overview");
  const [generating, setGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState(null);
  const [keyword, setKeyword] = useState("Artificial Intelligence Trends 2025");
  const [generateProgress, setGenerateProgress] = useState(0);
  const [apiKey, setApiKey] = useState("");
  const [schedulerOn, setSchedulerOn] = useState(true);
  const [logs, setLogs] = useState([
    { time: "09:00:12", msg: "CRON: Started daily generation job", type: "info" },
    { time: "09:00:45", msg: "Generated: 'The Future of AI in Healthcare'", type: "success" },
    { time: "09:01:23", msg: "Generated: 'Quantum Computing Explained'", type: "success" },
    { time: "09:02:01", msg: "Generated: 'Web3 Market Analysis 2025'", type: "success" },
    { time: "09:02:44", msg: "Published 3 posts to MongoDB", type: "success" },
    { time: "09:03:12", msg: "News fetch: 8 trending topics retrieved", type: "info" },
    { time: "10:00:00", msg: "CRON: Hourly news update started", type: "info" },
  ]);

  const stats = [
    { label: "Posts Published Today", value: "47", icon: "📝", trend: "+94%", color: "var(--accent2)" },
    { label: "Monthly Page Views", value: "128K", icon: "👁", trend: "+23%", color: "var(--gold)" },
    { label: "Newsletter Subscribers", value: "10,284", icon: "📬", trend: "+12%", color: "var(--green)" },
    { label: "Avg. Reading Time", value: "6.4 min", icon: "⏱", trend: "+8%", color: "var(--cyan)" },
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    setGeneratedPost(null);
    setGenerateProgress(0);
    const interval = setInterval(() => setGenerateProgress(p => Math.min(p + 5, 90)), 300);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Generate a complete blog post outline and introduction for: "${keyword}". 
Include: SEO title, meta description (155 chars), 5 H2 headings, 3 tags, target word count, and a 150-word introduction.
Format as JSON: { "title": "", "metaDescription": "", "headings": [], "tags": [], "wordCount": 0, "introduction": "" }`
          }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || "{}";
      const clean = text.replace(/```json|```/g, "").trim();
      try {
        const parsed = JSON.parse(clean);
        setGeneratedPost(parsed);
        setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg: `Generated: '${parsed.title}'`, type: "success" }, ...prev]);
      } catch {
        setGeneratedPost({ title: keyword, metaDescription: `Discover everything about ${keyword} in this comprehensive AI-generated guide.`, headings: ["Introduction", "Key Concepts", "Latest Trends", "Expert Analysis", "Conclusion & FAQ"], tags: ["AI", "Technology", "Innovation"], wordCount: 1800, introduction: "The landscape of " + keyword + " is evolving at an unprecedented pace. This comprehensive guide explores the latest developments, expert insights, and practical implications for professionals and enthusiasts alike." });
        setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg: `Generated: '${keyword}'`, type: "success" }, ...prev]);
      }
    } catch (err) {
      setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg: `Error: ${err.message}`, type: "error" }, ...prev]);
    } finally {
      clearInterval(interval);
      setGenerateProgress(100);
      setGenerating(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", padding: "0 24px" }}>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 40, width: "100%", maxWidth: 420, animation: "scaleIn 0.3s ease" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "linear-gradient(135deg, var(--accent), var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>⚡</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.8rem", fontWeight: 700, marginBottom: 6 }}>Admin Dashboard</h2>
            <p style={{ color: "var(--text3)", fontSize: 14 }}>NexusAI Control Panel</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: "var(--text2)", display: "block", marginBottom: 6 }}>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "var(--text2)", display: "block", marginBottom: 6 }}>Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8, padding: "12px" }}
              onClick={() => setIsLoggedIn(true)}>
              Sign In to Dashboard
            </button>
          </div>
          <p style={{ fontSize: 12, color: "var(--text3)", textAlign: "center", marginTop: 16 }}>Demo: any credentials work</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "📊 Overview" },
    { id: "generate", label: "🤖 AI Generator" },
    { id: "posts", label: "📝 Manage Posts" },
    { id: "settings", label: "⚙️ Settings" },
    { id: "logs", label: "📋 Logs" },
  ];

  return (
    <div style={{ paddingTop: 64, minHeight: "100vh", background: "var(--bg2)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 700 }}>Admin Dashboard</h1>
            <p style={{ color: "var(--text3)", fontSize: 14 }}>Welcome back · {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 14px" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: schedulerOn ? "var(--green)" : "var(--text3)", display: "inline-block", animation: schedulerOn ? "pulse 2s infinite" : "none" }} />
              <span style={{ fontSize: 13, color: "var(--text2)" }}>CRON: {schedulerOn ? "Running" : "Paused"}</span>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => setIsLoggedIn(false)}>Sign Out</button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28, background: "var(--surface)", padding: 4, borderRadius: "var(--radius)", width: "fit-content", border: "1px solid var(--border)" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontFamily: "var(--sans)", fontWeight: 500, transition: "all 0.2s", background: activeTab === tab.id ? "var(--accent)" : "transparent", color: activeTab === tab.id ? "white" : "var(--text2)" }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div className="grid-4" style={{ marginBottom: 32 }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 8 }}>{s.label}</p>
                      <p style={{ fontFamily: "var(--serif)", fontSize: "2rem", fontWeight: 700, color: s.color }}>{s.value}</p>
                    </div>
                    <span style={{ fontSize: 28 }}>{s.icon}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--green)", marginTop: 12 }}>↑ {s.trend} this week</p>
                </div>
              ))}
            </div>

            {/* Recent posts */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 24 }}>
              <h3 style={{ fontFamily: "var(--serif)", fontWeight: 600, marginBottom: 20 }}>Recent AI-Generated Posts</h3>
              {MOCK_POSTS.slice(0, 5).map(post => (
                <div key={post.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                  <Img src={post.image} alt="" seed={post.id} style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 6 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>{post.title.slice(0, 70)}...</p>
                    <p style={{ fontSize: 12, color: "var(--text3)" }}>{post.category} · {post.readTime} · {post.views} views</p>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn-ghost btn-sm">Edit</button>
                    <button className="btn btn-sm btn-ghost btn-sm" style={{ color: "var(--red)" }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Generator Tab */}
        {activeTab === "generate" && (
          <div style={{ animation: "fadeUp 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 28 }}>
              <h3 style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: "1.3rem", marginBottom: 6 }}>🤖 AI Blog Generator</h3>
              <p style={{ color: "var(--text3)", fontSize: 13, marginBottom: 24 }}>Generate a full 1500-2000 word blog post instantly</p>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: "var(--text2)", display: "block", marginBottom: 8 }}>Target Keyword / Topic</label>
                <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g. Artificial Intelligence Trends 2025" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 13, color: "var(--text2)", display: "block", marginBottom: 8 }}>Category</label>
                  <select><option>Technology</option><option>AI & ML</option><option>Business</option><option>Science</option></select>
                </div>
                <div>
                  <label style={{ fontSize: 13, color: "var(--text2)", display: "block", marginBottom: 8 }}>Word Count</label>
                  <select><option>1500 words</option><option>2000 words</option><option>2500 words</option></select>
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, color: "var(--text2)", display: "block", marginBottom: 8 }}>Writing Style</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Informative", "Persuasive", "Technical", "Casual"].map(style => (
                    <button key={style} className="btn btn-ghost btn-sm" style={{ fontSize: 12 }}>{style}</button>
                  ))}
                </div>
              </div>

              {generating && (
                <div style={{ background: "var(--bg2)", borderRadius: 8, padding: 14, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "var(--text2)" }}>
                    <span>Generating content...</span>
                    <span>{generateProgress}%</span>
                  </div>
                  <div style={{ height: 4, background: "var(--border)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${generateProgress}%`, background: "linear-gradient(90deg, var(--accent), var(--gold))", transition: "width 0.3s" }} />
                  </div>
                </div>
              )}

              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: 14 }} onClick={handleGenerate} disabled={generating}>
                {generating ? <><div className="spinner" style={{ width: 16, height: 16 }} /> Generating...</> : "⚡ Generate Blog Post"}
              </button>

              <div style={{ marginTop: 20, padding: 16, background: "var(--bg2)", borderRadius: 8 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>🕐 Bulk Scheduler</h4>
                <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 12 }}>Auto-generate 50 posts daily via CRON</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13, color: "var(--text2)" }}>Daily at 9:00 AM UTC</span>
                  <button className={`btn btn-sm ${schedulerOn ? "btn-ghost" : "btn-primary"}`} onClick={() => setSchedulerOn(!schedulerOn)}>
                    {schedulerOn ? "⏸ Pause" : "▶ Resume"}
                  </button>
                </div>
              </div>
            </div>

            {/* Generated post preview */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 28 }}>
              <h3 style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: "1.3rem", marginBottom: 20 }}>📄 Generated Output</h3>
              {!generatedPost && !generating ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text3)" }}>
                  <div style={{ fontSize: 48, marginBottom: 16, animation: "float 3s infinite" }}>✍️</div>
                  <p>Click "Generate Blog Post" to create AI content</p>
                </div>
              ) : generating ? (
                <div style={{ padding: "40px 0" }}>
                  {[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: i === 0 ? 28 : 16, marginBottom: 16, width: i % 3 === 2 ? "70%" : "100%" }} />)}
                </div>
              ) : generatedPost && (
                <div style={{ animation: "fadeUp 0.4s ease" }}>
                  <div style={{ background: "var(--accent-glow)", border: "1px solid rgba(124,106,247,0.2)", borderRadius: 8, padding: 14, marginBottom: 20 }}>
                    <p style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>SEO Title</p>
                    <p style={{ fontFamily: "var(--serif)", fontWeight: 600, color: "var(--text)" }}>{generatedPost.title}</p>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Meta Description</p>
                    <p style={{ fontSize: 13, color: "var(--text2)", background: "var(--bg2)", padding: 10, borderRadius: 6 }}>{generatedPost.metaDescription}</p>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>H2 Headings</p>
                    {(generatedPost.headings || []).map((h, i) => (
                      <div key={i} style={{ fontSize: 13, color: "var(--text2)", padding: "6px 10px", background: "var(--bg2)", borderRadius: 6, marginBottom: 6 }}>
                        <strong style={{ color: "var(--accent2)" }}>H2</strong> {h}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                    {(generatedPost.tags || []).map(t => <span key={t} className="tag tag-accent">{t}</span>)}
                    <span className="tag tag-green">~{generatedPost.wordCount} words</span>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Introduction Preview</p>
                    <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.6 }}>{generatedPost.introduction}</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn btn-primary btn-sm">📤 Publish Now</button>
                    <button className="btn btn-ghost btn-sm">📅 Schedule</button>
                    <button className="btn btn-ghost btn-sm">✏️ Edit</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Manage Posts Tab */}
        {activeTab === "posts" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <input placeholder="Search posts..." style={{ maxWidth: 280 }} />
              <button className="btn btn-primary btn-sm">+ New Post</button>
            </div>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
                    {["Title", "Category", "Views", "Date", "Status", "Actions"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_POSTS.map((post, i) => (
                    <tr key={post.id} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--surface2)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Img src={post.image} alt="" seed={post.id} style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 4 }} />
                          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.title}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}><CategoryTag cat={post.category} small /></td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text2)" }}>{post.views}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text3)" }}>{post.date}</td>
                      <td style={{ padding: "12px 16px" }}><span className="tag tag-green">Published</span></td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="btn btn-ghost btn-sm" style={{ padding: "4px 10px" }}>Edit</button>
                          <button className="btn btn-ghost btn-sm" style={{ padding: "4px 10px", color: "var(--red)" }}>Del</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div style={{ animation: "fadeUp 0.3s ease", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              { title: "🔑 API Configuration", fields: [{ label: "Gemini API Key", placeholder: "AIza...", type: "password" }, { label: "MongoDB URI", placeholder: "mongodb+srv://...", type: "password" }, { label: "Site URL", placeholder: "https://yourdomain.com", type: "text" }] },
              { title: "🕐 CRON Scheduler", fields: [{ label: "Daily Generation Time", placeholder: "09:00 UTC", type: "text" }, { label: "Posts Per Day", placeholder: "50", type: "number" }, { label: "News Update Interval (hours)", placeholder: "1", type: "number" }] },
              { title: "🔍 SEO Settings", fields: [{ label: "Site Name", placeholder: "NexusAI Blog", type: "text" }, { label: "Default Meta Description", placeholder: "Your AI news platform...", type: "text" }, { label: "Google Analytics ID", placeholder: "G-XXXXXXXXXX", type: "text" }] },
              { title: "📧 Email / Newsletter", fields: [{ label: "SMTP Host", placeholder: "smtp.gmail.com", type: "text" }, { label: "From Email", placeholder: "noreply@nexusai.com", type: "email" }, { label: "Newsletter Cron (daily)", placeholder: "08:00 UTC", type: "text" }] },
            ].map(section => (
              <div key={section.title} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 24 }}>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 600, marginBottom: 20 }}>{section.title}</h3>
                {section.fields.map(f => (
                  <div key={f.label} style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 13, color: "var(--text2)", display: "block", marginBottom: 6 }}>{f.label}</label>
                    <input placeholder={f.placeholder} type={f.type} />
                  </div>
                ))}
                <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }}>Save Settings</button>
              </div>
            ))}
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === "logs" && (
          <div style={{ animation: "fadeUp 0.3s ease" }}>
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontWeight: 600 }}>System Logs</h3>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)", display: "inline-block", animation: "pulse 2s infinite" }} />
                  <span style={{ fontSize: 13, color: "var(--text3)" }}>Live</span>
                </div>
              </div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 13, padding: 20, maxHeight: 440, overflowY: "auto", background: "#0D0D12" }}>
                {logs.map((log, i) => (
                  <div key={i} style={{ padding: "5px 0", display: "flex", gap: 16, color: log.type === "error" ? "var(--red)" : log.type === "success" ? "var(--green)" : "var(--text3)" }}>
                    <span style={{ color: "#555", flexShrink: 0 }}>[{log.time}]</span>
                    <span style={{ color: log.type === "error" ? "var(--red)" : log.type === "success" ? "var(--green)" : "#7AA2F7" }}>
                      {log.type === "error" ? "ERROR" : log.type === "success" ? "SUCCESS" : "INFO"}
                    </span>
                    <span style={{ color: "#CDD6F4" }}>{log.msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = ({ setPage }) => (
  <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "48px 24px 24px", marginTop: 60 }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--accent), var(--gold))", display: "flex", alignItems: "center", justifyContent: "center" }}>⚡</div>
            <span style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: 20 }}>NexusAI</span>
          </div>
          <p style={{ color: "var(--text3)", fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>The world's first fully automated AI blog and news platform. 50 expert articles published daily, powered by Google Gemini.</p>
        </div>
        {[
          { title: "Platform", links: ["Home", "Blog", "News", "Categories"] },
          { title: "Topics", links: ["Technology", "AI & ML", "Finance", "Science"] },
          { title: "Company", links: ["About", "Privacy Policy", "Terms", "Contact"] },
        ].map(section => (
          <div key={section.title}>
            <h4 style={{ fontWeight: 600, fontSize: 14, marginBottom: 16, color: "var(--text)" }}>{section.title}</h4>
            {section.links.map(link => (
              <div key={link} style={{ fontSize: 14, color: "var(--text3)", marginBottom: 10, cursor: "pointer" }}
                onMouseEnter={e => e.target.style.color = "var(--accent2)"} onMouseLeave={e => e.target.style.color = "var(--text3)"}>
                {link}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="divider" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, color: "var(--text3)" }}>
        <span>© 2025 NexusAI. All rights reserved. Powered by Gemini AI.</span>
        <span style={{ color: "var(--accent2)" }}>Built with Next.js · MongoDB · TailwindCSS</span>
      </div>
    </div>
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedPost, setSelectedPost] = useState(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, theme]);

  return (
    <div data-theme={theme} style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <FontLoader />
      <Nav page={page} setPage={setPage} theme={theme} setTheme={setTheme} />

      {page === "home" && <HomePage setPage={setPage} setSelectedPost={setSelectedPost} />}
      {page === "blog" && <BlogPage setPage={setPage} setSelectedPost={setSelectedPost} />}
      {page === "post" && selectedPost && <BlogPostPage post={selectedPost} setPage={setPage} />}
      {page === "news" && <NewsPage />}
      {page === "admin" && <AdminDashboard />}
      {page === "categories" && <BlogPage setPage={setPage} setSelectedPost={setSelectedPost} />}

      {page !== "admin" && <Footer setPage={setPage} />}
    </div>
  );
}
