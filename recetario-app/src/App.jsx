import React, { useState, useEffect, useMemo } from 'react';

const INITIAL_RECIPES = [
  {
    id: "enchiladas-suizas",
    title: "Enchiladas Suizas Tradicionales",
    subtitle: "Gratinadas con queso manchego y salsa verde cremosa de tomatillo",
    shortDescription: "Tortillas artesanales rellenas de pechuga desmenuzada, bañadas en una tersa salsa verde de tomatillo con crema fresca y queso horneado al punto de gratinado perfecto.",
    description: "Un clásico imprescindible de la gastronomía mexicana casera. El secreto radica en el tatemado ligero de los tomatillos de milpa y la incorporación de crema ácida de alta densidad, logrando un equilibrio idóneo entre acidez, cremosidad y un toque sutil de picor.",
    prepTime: "20 MIN",
    cookTime: "25 MIN",
    totalTime: "45 MIN",
    servings: 4,
    difficulty: "Intermedia",
    category: "Cocina Mexicana",
    image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      { amount: 12, unit: "piezas", item: "tortillas de maíz nixtamalizado" },
      { amount: 500, unit: "g", item: "pechuga de pollo cocida y desmenuzada" },
      { amount: 500, unit: "g", item: "tomatillo verde fresco de milpa" },
      { amount: 2, unit: "piezas", item: "chiles serranos frescos" },
      { amount: 0.5, unit: "pieza", item: "cebolla blanca grande" },
      { amount: 2, unit: "dientes", item: "ajo fresco" },
      { amount: 200, unit: "ml", item: "crema ácida de rancho" },
      { amount: 250, unit: "g", item: "queso manchego o asadero rallado" },
      { amount: 250, unit: "ml", item: "caldo de pollo casero concentrado" },
      { amount: 1, unit: "manojo", item: "cilantro fresco lavado y desinfectado" },
      { amount: 2, unit: "cucharadas", item: "aceite vegetal de aguacate o maíz" },
      { amount: 1, unit: "pizca", item: "sal marina y pimienta negra recién molida" }
    ],
    steps: [
      { title: "Cocción y deshebrado del pollo", description: "Coloca la pechuga en agua hirviendo con cebolla, ajo y sal durante 20 minutos. Deja enfriar en su propio caldo para conservar su jugosidad y deshebra en hebras medianas." },
      { title: "Tatemado artesanal de vegetales", description: "En un comal o sartén de hierro colado a fuego medio-alto, asa ligeramente los tomatillos verdes y los chiles serranos hasta que la piel se dore de forma pareja sin quemarse." },
      { title: "Licuado emulsionado de la salsa verde", description: "Lleva a la licuadora los tomatillos tatemados, chiles, ajo, cebolla, el cilantro fresco, la crema ácida y el caldo de pollo. Licúa a velocidad máxima hasta lograr una emulsión tersa y homogénea." },
      { title: "Sazonado y espesado de la salsa", description: "Vierte la salsa verde en una cacerola profunda con una cucharada de aceite caliente. Cocina a fuego medio durante 10 minutos moviendo constantemente hasta que tome cuerpo y espese." },
      { title: "Pasado suave de tortillas por aceite", description: "Pasa rápidamente cada tortilla por aceite vegetal caliente durante 3 segundos por lado. Esto les dará flexibilidad para enrollar sin romperse y evitará que absorban exceso de salsa." },
      { title: "Ensamblado y enrollado de piezas", description: "Rellena generosamente cada tortilla con el pollo desmenuzado, enróllalas firmemente y acomódalas de forma continua en un refractario para horno." },
      { title: "Baño de salsa y cobertura de queso", description: "Baña por completo las enchiladas con la salsa verde hirviente y distribuye el queso manchego rallado de forma uniforme cubriendo todos los bordes." },
      { title: "Horneado y gratinado gourmet", description: "Lleva al horno precalentado a 200°C durante 10 minutos o activa la función de gratinador durante 3 minutos hasta que el queso forme una capa dorada y burbujeante." }
    ],
    chefTips: "Agrega unas gotas de jugo de limón fresco al momento de licuar la salsa para realzar el verdor del cilantro y cortar la suntuosidad de la crema."
  },
  {
    id: "lasana-carne",
    title: "Lasaña Tradicional de Carne a la Boloñesa",
    subtitle: "Ragú de res y cerdo estofado a fuego lento, bechamel artesanal y gratinado tricolor",
    shortDescription: "Capas intercaladas de pasta fresca, salsa boloñesa con vino tinto reducida pacientemente, bechamel perfumada con nuez moscada y una costra crujiente de parmesano.",
    description: "Un clásico absoluto de la cocina italiana reconfortante. Elaborada meticulosamente desde cero con un ragú estofado durante 45 minutos, amalgamado con la suavidad de una bechamel sedosa y quesos italianos seleccionados.",
    prepTime: "30 MIN",
    cookTime: "45 MIN",
    totalTime: "1H 15M",
    servings: 6,
    difficulty: "Avanzada",
    category: "Cocina Italiana",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=1200&auto=format&fit=crop",
    ingredients: [
      { amount: 12, unit: "láminas", item: "pasta para lasaña (precocida o fresca)" },
      { amount: 400, unit: "g", item: "carne molida de res seleccionada" },
      { amount: 200, unit: "g", item: "carne molida de cerdo magra" },
      { amount: 800, unit: "g", item: "tomate italiano triturado tipo Passata" },
      { amount: 1, unit: "pieza", item: "cebolla blanca finamente picada en brunoise" },
      { amount: 2, unit: "dientes", item: "ajo picado minuciosamente" },
      { amount: 100, unit: "ml", item: "vino tinto seco de buena calidad" },
      { amount: 300, unit: "g", item: "queso mozzarella fresco rallado" },
      { amount: 120, unit: "g", item: "queso parmesano Reggiano recién rallado" },
      { amount: 1000, unit: "ml", item: "leche entera tibia" },
      { amount: 60, unit: "g", item: "mantequilla sin sal" },
      { amount: 60, unit: "g", item: "harina de trigo todo uso" },
      { amount: 1, unit: "pizca", item: "nuez moscada, sal marina y pimienta negra" },
      { amount: 1, unit: "cucharada", item: "mezcla de hierbas italianas (orégano, albahaca, tomillo)" }
    ],
    steps: [
      { title: "Sofrito base y dorado de carnes", description: "En una cacerola amplia, sofríe la cebolla y el ajo en aceite de oliva hasta que estén translúcidos. Añade la carne molida de res y cerdo mezclando con tenedor para separar los grumos hasta dorar." },
      { title: "Desglaseado con vino tinto", description: "Vierte el vino tinto sobre la carne dorada a fuego vivo, raspando el fondo para liberar los azúcares caramelizados. Deja reducir por 3 a 5 minutos hasta evaporar el alcohol." },
      { title: "Estofado lento del ragú boloñés", description: "Añade el tomate triturado Passata y las hierbas italianas. Reduce el fuego al mínimo, tapa parcialmente y deja estofar pacientemente durante 45 minutos." },
      { title: "Elaboración de la salsa bechamel", description: "Derrite la mantequilla en un cazo, incorpora la harina y cocina el roux por 2 minutos. Vierte la leche tibia poco a poco batiendo continuamente con globo para evitar grumos. Sazona con nuez moscada rallada y sal." },
      { title: "Preparación de las láminas de pasta", description: "Sumerge brevemente las láminas de pasta en agua hirviendo con sal según las instrucciones del fabricante y extiéndelas sobre paños limpios." },
      { title: "Montaje perfecto por capas", description: "En un refractario rectangular profundo, extienda una capa fina de bechamel. Alterna láminas de pasta, ragú boloñés, bechamel y queso mozzarella. Repite hasta completar 4 capas." },
      { title: "Cobertura final y quesos", description: "Corona la última capa de pasta cubriéndola completamente con el resto de la bechamel, mozzarella y una lluvia abundante de parmesano Reggiano." },
      { title: "Horneado y reposo estructural", description: "Hornea a 190°C durante 30 minutos hasta que la superficie esté dorada. Reposa fuera del horno 15 minutos obligatorios antes de trinchera para estabilizar la estructura." }
    ],
    chefTips: "Respetar el tiempo de reposo tras el horneado es vital: permite que la proteína de los quesos y la bechamel se asienten para lograr cortes geométricos perfectos."
  }
];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --bg-main: #FAF8F5;
    --bg-card: #FFFFFF;
    --bg-alt: #F2EDE4;
    --primary: #171A16;
    --primary-light: #2A3129;
    --secondary: #4A5638;
    --accent: #C26D24;
    --accent-hover: #A55717;
    --accent-soft: rgba(194, 109, 36, 0.09);
    --text-dark: #141713;
    --text-muted: #5D6358;
    --text-light: #949A8F;
    --border-color: rgba(23, 26, 22, 0.08);
    --border-hover: rgba(194, 109, 36, 0.35);
    --shadow-sm: 0 4px 14px rgba(0, 0, 0, 0.03);
    --shadow-md: 0 10px 30px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 20px 45px -10px rgba(0, 0, 0, 0.12);
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --transition-smooth: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; scroll-behavior: smooth; }

  body {
    background-color: var(--bg-main);
    color: var(--text-dark);
    font-family: var(--font-sans);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .navbar {
    position: fixed; top: 0; width: 100%; height: 76px; padding: 0 6%;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(250, 248, 245, 0.92);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    z-index: 1000; border-bottom: 1px solid var(--border-color);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.02);
  }

  .nav-brand {
    display: flex; align-items: center; gap: 0.9rem; cursor: pointer;
    user-select: none; text-decoration: none; background: none; border: none; text-align: left;
  }
  .nav-brand-icon {
    width: 42px; height: 42px; border-radius: 12px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transition: var(--transition-smooth); flex-shrink: 0;
  }
  .nav-brand:hover .nav-brand-icon {
    transform: rotate(-6deg) scale(1.05); background: var(--accent); color: #FFF;
  }
  .nav-brand-text {
    display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
  }
  .nav-brand-title {
    font-family: var(--font-serif); font-size: 1.55rem; letter-spacing: 0.5px;
    color: var(--primary); font-weight: 700; line-height: 1.1;
  }
  .nav-brand-subtitle {
    font-size: 0.65rem; text-transform: uppercase; letter-spacing: 2px;
    color: var(--accent); font-weight: 700; margin-top: 2px; display: block;
  }

  .nav-controls { display: flex; align-items: center; gap: 1rem; }

  .nav-links { display: flex; align-items: center; gap: 0.5rem; list-style: none; }
  .nav-links button {
    background: transparent; border: 1px solid transparent; font-family: var(--font-sans);
    color: var(--text-dark); font-weight: 600; font-size: 0.82rem; text-transform: uppercase;
    letter-spacing: 1.4px; cursor: pointer; padding: 0.55rem 1.25rem; border-radius: 50px;
    transition: var(--transition-smooth);
  }
  .nav-links button:hover {
    color: var(--accent); background: var(--accent-soft);
  }
  .nav-links button.active-nav {
    background: var(--primary); color: #FFF; border-color: var(--primary);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }

  .hero-container {
    min-height: 88vh; padding: 130px 6% 60px; display: grid;
    grid-template-columns: 1.15fr 0.85fr; align-items: center; gap: 4.5rem;
  }

  .hero-tag {
    display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.45rem 1.1rem;
    background: var(--bg-alt); border-radius: 50px; font-size: 0.75rem;
    font-weight: 700; text-transform: uppercase; letter-spacing: 1.8px;
    color: var(--secondary); margin-bottom: 1.5rem; border: 1px solid var(--border-color);
  }
  .hero-tag-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); display: inline-block; }

  .hero-title {
    font-family: var(--font-serif); font-size: clamp(2.8rem, 4.8vw, 4.2rem);
    line-height: 1.1; color: var(--primary); font-weight: 700; margin-bottom: 1.5rem;
  }
  .hero-title i { font-style: italic; font-weight: 400; color: var(--accent); }

  .hero-description {
    font-size: 1.08rem; line-height: 1.75; color: var(--text-muted);
    margin-bottom: 2.2rem; max-width: 540px; font-weight: 400;
  }

  .hero-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }

  .cta-button {
    display: inline-flex; align-items: center; gap: 0.8rem;
    padding: 1.1rem 2.4rem; background: var(--primary); color: #FFF;
    border: none; border-radius: 12px; font-size: 0.82rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 1.5px; cursor: pointer;
    transition: var(--transition-smooth); box-shadow: var(--shadow-md);
  }
  .cta-button:hover {
    background: var(--accent); transform: translateY(-3px); box-shadow: var(--shadow-lg);
  }
  .cta-button svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 2.2; transition: transform 0.3s ease; }
  .cta-button:hover svg { transform: translateX(5px); }

  .hero-visual { position: relative; height: 62vh; min-height: 400px; }
  .hero-image-frame {
    width: 100%; height: 100%; border-radius: 24px; overflow: hidden;
    box-shadow: var(--shadow-lg); border: 1px solid var(--border-color); position: relative;
  }
  .hero-image-frame img { width: 100%; height: 100%; object-fit: cover; }

  .hero-glass-card {
    position: absolute; bottom: 20px; left: 20px; right: 20px;
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    padding: 1.25rem 1.6rem; border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); display: flex; align-items: center; justify-content: space-between;
  }
  .hero-glass-card h4 { font-family: var(--font-serif); font-size: 1.25rem; color: var(--primary); font-weight: 700; }
  .hero-glass-card p { font-size: 0.82rem; color: var(--text-muted); margin-top: 2px; }
  .hero-glass-icon {
    width: 44px; height: 44px; border-radius: 50%; background: var(--primary);
    display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0;
  }

  .filter-bar-section {
    padding: 2rem 6% 0; display: flex; justify-content: space-between; align-items: center;
    gap: 1.5rem; flex-wrap: wrap;
  }
  .category-tabs { display: flex; gap: 0.6rem; overflow-x: auto; padding-bottom: 4px; }
  .tab-btn {
    padding: 0.6rem 1.3rem; border-radius: 50px; border: 1px solid var(--border-color);
    background: var(--bg-card); color: var(--text-muted); font-size: 0.8rem; font-weight: 600;
    cursor: pointer; transition: var(--transition-smooth); white-space: nowrap;
  }
  .tab-btn:hover { border-color: var(--accent); color: var(--accent); }
  .tab-btn.active { background: var(--secondary); color: #FFF; border-color: var(--secondary); }

  .search-box {
    position: relative; width: 280px; display: flex; align-items: center;
  }
  .search-box input {
    width: 100%; padding: 0.65rem 1rem 0.65rem 2.5rem; border-radius: 50px;
    border: 1px solid var(--border-color); background: var(--bg-card);
    font-family: var(--font-sans); font-size: 0.85rem; color: var(--text-dark);
    outline: none; transition: var(--transition-smooth);
  }
  .search-box input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
  .search-icon { position: absolute; left: 1rem; color: var(--text-light); width: 16px; height: 16px; pointer-events: none; }

  .recipes-section { padding: 3rem 6% 6.5rem; }

  .section-title-wrap { text-align: center; max-width: 600px; margin: 0 auto 3.5rem; }
  .section-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2.5px; color: var(--accent); font-weight: 700; margin-bottom: 0.6rem; }
  .section-title-wrap h2 { font-family: var(--font-serif); font-size: 3rem; color: var(--primary); font-weight: 700; }

  .recipes-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3.5rem; }

  .card-gourmet {
    background: var(--bg-card); border-radius: 22px; overflow: hidden;
    border: 1px solid var(--border-color); transition: var(--transition-smooth);
    display: flex; flex-direction: column; position: relative;
    box-shadow: var(--shadow-sm);
  }
  .card-gourmet:hover {
    transform: translateY(-8px); border-color: var(--border-hover); box-shadow: var(--shadow-lg);
  }

  .card-media { position: relative; height: 330px; overflow: hidden; }
  .card-media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
  .card-gourmet:hover .card-media img { transform: scale(1.06); }

  .card-badge-category {
    position: absolute; top: 1.2rem; left: 1.2rem; background: rgba(23, 26, 22, 0.85);
    backdrop-filter: blur(8px); color: #FFF; padding: 0.45rem 0.95rem; border-radius: 50px;
    font-size: 0.7rem; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase;
  }

  .card-body { padding: 2.2rem; display: flex; flex-direction: column; flex-grow: 1; }
  .card-title { font-family: var(--font-serif); font-size: 1.85rem; color: var(--primary); font-weight: 700; margin-bottom: 0.4rem; }
  .card-subtitle { font-size: 0.85rem; color: var(--accent); font-weight: 600; margin-bottom: 1rem; }
  .card-text { font-size: 0.95rem; line-height: 1.65; color: var(--text-muted); margin-bottom: 1.8rem; flex-grow: 1; }

  .card-specs {
    display: flex; justify-content: space-between; padding-top: 1.2rem; margin-bottom: 1.8rem;
    border-top: 1px solid var(--border-color); font-size: 0.8rem; font-weight: 600; color: var(--text-dark);
  }
  .card-spec-item { display: flex; align-items: center; gap: 0.45rem; color: var(--text-muted); }
  .card-spec-item svg { width: 16px; height: 16px; stroke: var(--accent); fill: none; stroke-width: 2; }

  .btn-card-action {
    width: 100%; padding: 1rem; background: transparent; border: 1.5px solid var(--primary);
    color: var(--primary); border-radius: 12px; font-weight: 700; font-size: 0.8rem;
    text-transform: uppercase; letter-spacing: 1.5px; cursor: pointer; transition: var(--transition-smooth);
    display: flex; align-items: center; justify-content: center; gap: 0.6rem;
  }
  .btn-card-action svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2.2; transition: transform 0.3s; }
  .card-gourmet:hover .btn-card-action { background: var(--primary); color: #FFF; }
  .card-gourmet:hover .btn-card-action svg { transform: translateX(4px); }

  .detail-wrapper { padding: 110px 6% 60px; max-width: 1240px; margin: 0 auto; }

  .detail-header-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }

  .btn-back-nav {
    display: inline-flex; align-items: center; gap: 0.6rem; background: none; border: none;
    font-family: var(--font-sans); font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1.4px; color: var(--text-muted); cursor: pointer; transition: color 0.3s;
  }
  .btn-back-nav svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2.2; }
  .btn-back-nav:hover { color: var(--accent); }

  .detail-actions { display: flex; gap: 0.8rem; }
  .icon-action-btn {
    background: var(--bg-card); border: 1px solid var(--border-color); width: 40px; height: 40px;
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: var(--text-dark); transition: var(--transition-smooth);
  }
  .icon-action-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

  .detail-hero-header { text-align: center; max-width: 840px; margin: 0 auto 2.5rem; }
  .detail-hero-header h1 { font-family: var(--font-serif); font-size: clamp(2.4rem, 4vw, 3.6rem); color: var(--primary); margin-bottom: 0.8rem; font-weight: 700; }
  .detail-hero-header p { font-size: 1.08rem; line-height: 1.75; color: var(--text-muted); }

  .detail-stats-bar {
    display: flex; justify-content: center; gap: 2.5rem; margin: 2rem 0; padding: 1.2rem 2.2rem;
    background: var(--bg-card); border-radius: 50px; border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm); flex-wrap: wrap;
  }
  .stat-pill { display: flex; align-items: center; gap: 0.75rem; }
  .stat-pill-icon {
    width: 38px; height: 38px; border-radius: 50%; background: var(--accent-soft);
    display: flex; align-items: center; justify-content: center; color: var(--accent);
  }
  .stat-pill-icon svg { width: 18px; height: 18px; stroke: currentColor; fill: none; stroke-width: 2; }
  .stat-pill-info { display: flex; flex-direction: column; align-items: flex-start; }
  .stat-pill-info label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); font-weight: 600; }
  .stat-pill-info span { font-size: 0.92rem; font-weight: 700; color: var(--primary); }

  .detail-cover-image {
    width: 100%; height: 500px; border-radius: 24px; object-fit: cover;
    box-shadow: var(--shadow-lg); margin-bottom: 3.5rem; border: 1px solid var(--border-color);
  }

  .detail-layout-grid { display: grid; grid-template-columns: 360px 1fr; gap: 3.5rem; align-items: start; }

  .sticky-panel { position: sticky; top: 96px; }

  .panel-box {
    background: var(--bg-card); padding: 2rem; border-radius: 20px;
    border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); margin-bottom: 2rem;
  }
  .panel-title-wrap { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; }
  .panel-title { font-family: var(--font-serif); font-size: 1.55rem; color: var(--primary); font-weight: 700; }

  .servings-control {
    display: flex; align-items: center; gap: 0.5rem; background: var(--bg-alt);
    padding: 0.3rem 0.6rem; border-radius: 50px; border: 1px solid var(--border-color);
  }
  .servings-btn {
    width: 24px; height: 24px; border-radius: 50%; background: var(--bg-card);
    border: 1px solid var(--border-color); color: var(--primary); font-weight: 700;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    transition: var(--transition-smooth); font-size: 0.9rem;
  }
  .servings-btn:hover { background: var(--accent); color: #FFF; border-color: var(--accent); }
  .servings-num { font-size: 0.8rem; font-weight: 700; min-width: 16px; text-align: center; }

  .ingredients-interactive-list { list-style: none; }
  .ingredient-row {
    display: flex; align-items: flex-start; gap: 0.9rem; padding: 0.85rem 0;
    border-bottom: 1px solid var(--border-color); cursor: pointer; transition: opacity 0.3s;
  }
  .ingredient-row:last-child { border-bottom: none; }

  .custom-checkbox {
    width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--secondary);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; transition: all 0.2s;
  }
  .ingredient-row.active .custom-checkbox { background: var(--accent); border-color: var(--accent); }
  .custom-checkbox svg { width: 12px; height: 12px; fill: none; stroke: #FFF; stroke-width: 3; display: none; }
  .ingredient-row.active .custom-checkbox svg { display: block; }
  .ingredient-row.active span { text-decoration: line-through; color: var(--text-muted); opacity: 0.6; }
  .ingredient-row span { font-size: 0.92rem; line-height: 1.5; color: var(--text-dark); }
  .ingredient-amount { font-weight: 700; color: var(--accent); margin-right: 0.3rem; }

  .chef-note-card {
    background: var(--accent-soft); border-left: 4px solid var(--accent);
    padding: 1.4rem; border-radius: 0 14px 14px 0; margin-top: 2rem;
  }
  .chef-note-card h5 { font-family: var(--font-serif); font-size: 1.15rem; color: var(--accent); margin-bottom: 0.4rem; font-weight: 700; }
  .chef-note-card p { font-size: 0.88rem; line-height: 1.6; color: var(--text-dark); font-style: italic; }

  .timer-widget {
    background: var(--primary); color: #FFF; padding: 1.4rem; border-radius: 16px;
    margin-top: 1.5rem; text-align: center; display: flex; flex-direction: column; align-items: center;
  }
  .timer-display { font-family: var(--font-serif); font-size: 2.2rem; font-weight: 700; color: var(--accent); margin: 0.4rem 0 0.8rem; letter-spacing: 2px; }
  .timer-actions { display: flex; gap: 0.6rem; }
  .timer-btn {
    padding: 0.45rem 1rem; border-radius: 50px; border: none; font-size: 0.75rem;
    font-weight: 700; text-transform: uppercase; cursor: pointer; transition: var(--transition-smooth);
  }
  .timer-btn-primary { background: var(--accent); color: #FFF; }
  .timer-btn-primary:hover { background: var(--accent-hover); }
  .timer-btn-secondary { background: rgba(255, 255, 255, 0.15); color: #FFF; }
  .timer-btn-secondary:hover { background: rgba(255, 255, 255, 0.25); }

  .tracker-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.8rem; }
  .tracker-title { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.4px; color: var(--primary); }
  .tracker-count { font-size: 0.88rem; font-weight: 700; color: var(--accent); }

  .tracker-bar-bg { width: 100%; height: 8px; background: var(--bg-alt); border-radius: 10px; overflow: hidden; }
  .tracker-bar-fill { height: 100%; background: linear-gradient(90deg, var(--secondary), var(--accent)); transition: width 0.4s ease; }

  .steps-timeline { display: flex; flex-direction: column; gap: 1.4rem; margin-top: 2rem; }

  .step-card {
    background: var(--bg-card); padding: 1.6rem; border-radius: 16px;
    border: 1px solid var(--border-color); cursor: pointer; transition: var(--transition-smooth);
    display: grid; grid-template-columns: 48px 1fr; gap: 1.2rem;
  }
  .step-card:hover { border-color: var(--border-hover); box-shadow: var(--shadow-md); transform: translateX(4px); }

  .step-card-num {
    font-family: var(--font-serif); font-size: 1.85rem; font-weight: 700;
    color: var(--secondary); opacity: 0.45; transition: opacity 0.3s;
  }
  .step-card.done .step-card-num { color: var(--accent); opacity: 1; }

  .step-card-content h4 { font-family: var(--font-serif); font-size: 1.25rem; color: var(--primary); margin-bottom: 0.4rem; font-weight: 700; }
  .step-card-content p { font-size: 0.94rem; line-height: 1.68; color: var(--text-muted); }

  .step-card.done { background: var(--bg-main); opacity: 0.75; }
  .step-card.done h4 { text-decoration: line-through; }

  .footer-gourmet {
    background: #141813; color: #FFF; padding: 5rem 6% 2.8rem;
    margin-top: auto; border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .footer-main-content {
    display: flex; justify-content: space-between; align-items: center;
    padding-bottom: 3.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    flex-wrap: wrap; gap: 2.5rem;
  }
  .footer-brand-info { max-width: 440px; }
  .footer-brand-header { display: flex; align-items: center; gap: 0.9rem; margin-bottom: 0.9rem; }
  .footer-brand-icon {
    width: 40px; height: 40px; border-radius: 10px; background: var(--accent);
    display: flex; align-items: center; justify-content: center; color: #FFF;
  }
  .footer-brand-icon svg { width: 20px; height: 20px; fill: currentColor; }
  .footer-title { font-family: var(--font-serif); font-size: 1.7rem; color: #FFF; font-weight: 700; }
  .footer-desc { color: rgba(255, 255, 255, 0.6); font-size: 0.9rem; line-height: 1.65; }

  .footer-quick-actions { display: flex; gap: 1rem; }
  .footer-action-btn {
    background: rgba(255, 255, 255, 0.06); color: #FFF; border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 0.85rem 1.6rem; border-radius: 50px; font-size: 0.78rem; font-weight: 600;
    text-transform: uppercase; letter-spacing: 1.4px; cursor: pointer; transition: var(--transition-smooth);
    display: inline-flex; align-items: center; gap: 0.6rem;
  }
  .footer-action-btn svg { width: 14px; height: 14px; stroke: currentColor; fill: none; stroke-width: 2.2; }
  .footer-action-btn:hover {
    background: var(--accent); border-color: var(--accent); transform: translateY(-3px);
  }

  .footer-bottom-bar {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 2.2rem; font-size: 0.75rem; color: rgba(255, 255, 255, 0.4);
    flex-wrap: wrap; gap: 1rem;
  }
  .footer-copy { text-transform: uppercase; letter-spacing: 1.4px; }
  .footer-pill {
    background: rgba(255, 255, 255, 0.06); padding: 0.4rem 1rem;
    border-radius: 50px; color: rgba(255, 255, 255, 0.6); font-weight: 500;
  }

  @media (max-width: 1024px) {
    .hero-container { grid-template-columns: 1fr; padding-top: 130px; text-align: center; gap: 3rem; }
    .hero-description { margin: 0 auto 2rem; }
    .hero-actions { justify-content: center; }
    .hero-visual { height: 45vh; }
    .recipes-grid { grid-template-columns: 1fr; }
    .detail-layout-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .sticky-panel { position: static; }
    .footer-main-content { flex-direction: column; text-align: center; align-items: center; }
    .footer-brand-header { justify-content: center; }
  }
  @media (max-width: 600px) {
    .navbar { padding: 0 4%; }
    .nav-brand-subtitle { display: none; }
    .filter-bar-section { flex-direction: column; align-items: stretch; }
    .search-box { width: 100%; }
    .detail-stats-bar { flex-direction: column; gap: 1.2rem; border-radius: 18px; text-align: center; align-items: flex-start; }
    .step-card { grid-template-columns: 1fr; gap: 0.5rem; }
    .footer-bottom-bar { flex-direction: column; text-align: center; }
  }
`;

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  const [currentServings, setCurrentServings] = useState(4);

  const [timerTime, setTimerTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedRecipe]);

  useEffect(() => {
    let interval = null;
    if (timerActive && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prev) => prev - 1);
      }, 1000);
    } else if (timerTime === 0) {
      setTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerTime]);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentServings(recipe.servings);
    setCheckedIngredients({});
    setCompletedSteps({});
    setTimerActive(false);
    setTimerTime(0);
    setCurrentView('detail');
  };

  const handleGoHome = () => {
    setCurrentView('home');
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx) => {
    setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleServingChange = (delta) => {
    setCurrentServings((prev) => Math.max(1, Math.min(20, prev + delta)));
  };

  const startTimer = (minutes) => {
    setTimerTime(minutes * 60);
    setTimerActive(true);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToSection = (id) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredRecipes = useMemo(() => {
    return INITIAL_RECIPES.filter((recipe) => {
      const matchesCategory =
        selectedCategory === 'Todas' || recipe.category === selectedCategory;
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = ['Todas', 'Cocina Mexicana', 'Cocina Italiana'];

  return (
    <>
      <style>{globalStyles}</style>
      <div className="app-container">
        
        <nav className="navbar" role="navigation" aria-label="Navegación principal">
          <button className="nav-brand" onClick={handleGoHome}>
            <div className="nav-brand-icon">
              <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M8.1 13.34l2.83-2.83L3.91 3.5a4 4 0 00-5.66 5.66l7.02 7.02 2.83-2.84zM14.88 11.53l6.37-6.37a2.5 2.5 0 00-3.54-3.54l-6.37 6.37 3.54 3.54zM12 15l-1.41 1.41 6.36 6.36a1 1 0 001.42 0l2.83-2.83a1 1 0 000-1.42L14.83 12.17 12 15z"/></svg>
            </div>
            <div className="nav-brand-text">
              <span className="nav-brand-title">Recetario</span>
              <span className="nav-brand-subtitle">Gastronomía Premium</span>
            </div>
          </button>

          <div className="nav-controls">
            <ul className="nav-links">
              <li>
                <button
                  className={currentView === 'home' ? 'active-nav' : ''}
                  onClick={handleGoHome}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('recetas')}>
                  Recetas
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {currentView === 'home' ? (
          <main>
            <section className="hero-container">
              <div>
                <div className="hero-tag">
                  <span className="hero-tag-dot" />
                  Colección de Alta Cocina
                </div>
                <h1 className="hero-title">
                  El arte de cocinar <i>paso a paso</i>.
                </h1>
                <p className="hero-description">
                  Una plataforma interactiva de guías culinarias de precisión. Selecciona tus porciones, marca tus insumos en tiempo real y disfruta de recetas explicadas al detalle.
                </p>
                <div className="hero-actions">
                  <button className="cta-button" onClick={() => scrollToSection('recetas')}>
                    Explorar Colección
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>

              <div className="hero-visual">
                <div className="hero-image-frame">
                  <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop" alt="Experiencia Gastronómica" />
                  <div className="hero-glass-card">
                    <div>
                      <h4>Cocina Interactiva</h4>
                      <p>Temporizador y escalador de porciones en vivo.</p>
                    </div>
                    <div className="hero-glass-icon">
                      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="recetas" className="filter-bar-section">
              <div className="category-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="search-box">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  type="text"
                  placeholder="Buscar platillo o ingrediente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </section>

            <section className="recipes-section">
              <div className="section-title-wrap">
                <div className="section-label">Platillos Exclusivos</div>
                <h2>
                  {selectedCategory === "Todas"
                    ? "Catálogo Gastronómico"
                    : selectedCategory}
                </h2>
              </div>

              {filteredRecipes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                  <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)' }}>No se encontraron recetas con el criterio seleccionado.</p>
                </div>
              ) : (
                <div className="recipes-grid">
                  {filteredRecipes.map((recipe) => (
                    <article key={recipe.id} className="card-gourmet">
                      <div className="card-media">
                        <span className="card-badge-category">{recipe.category}</span>
                        <img src={recipe.image} alt={recipe.title} loading="lazy" />
                      </div>
                      <div className="card-body">
                        <h3 className="card-title">{recipe.title}</h3>
                        <div className="card-subtitle">{recipe.subtitle}</div>
                        <p className="card-text">{recipe.shortDescription}</p>

                        <div className="card-specs">
                          <div className="card-spec-item">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            <span>{recipe.totalTime}</span>
                          </div>
                          <div className="card-spec-item">
                            <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            <span>{recipe.servings} Porciones</span>
                          </div>
                          <div className="card-spec-item">
                            <svg viewBox="0 0 24 24"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
                            <span>{recipe.difficulty}</span>
                          </div>
                        </div>

                        <button className="btn-card-action" onClick={() => handleSelectRecipe(recipe)}>
                          Ver Guía Completa
                          <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </main>
        ) : (
          <main className="detail-wrapper">
            <div className="detail-header-bar">
              <button className="btn-back-nav" onClick={handleGoHome}>
                <svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                Volver al Catálogo
              </button>

              <div className="detail-actions">
                <button
                  className="icon-action-btn"
                  title="Imprimir Receta"
                  onClick={() => window.print()}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                </button>
              </div>
            </div>

            <header className="detail-hero-header">
              <h1>{selectedRecipe.title}</h1>
              <p>{selectedRecipe.description}</p>

              <div className="detail-stats-bar">
                <div className="stat-pill">
                  <div className="stat-pill-icon">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div className="stat-pill-info">
                    <label>Preparación</label>
                    <span>{selectedRecipe.prepTime}</span>
                  </div>
                </div>

                <div className="stat-pill">
                  <div className="stat-pill-icon">
                    <svg viewBox="0 0 24 24"><path d="M12 2v10l4.5 4.5"/><circle cx="12" cy="12" r="10"/></svg>
                  </div>
                  <div className="stat-pill-info">
                    <label>Cocción</label>
                    <span>{selectedRecipe.cookTime}</span>
                  </div>
                </div>

                <div className="stat-pill">
                  <div className="stat-pill-icon">
                    <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  </div>
                  <div className="stat-pill-info">
                    <label>Tiempo Total</label>
                    <span>{selectedRecipe.totalTime}</span>
                  </div>
                </div>

                <div className="stat-pill">
                  <div className="stat-pill-icon">
                    <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                  </div>
                  <div className="stat-pill-info">
                    <label>Dificultad</label>
                    <span>{selectedRecipe.difficulty}</span>
                  </div>
                </div>
              </div>
            </header>

            <img className="detail-cover-image" src={selectedRecipe.image} alt={selectedRecipe.title} />

            <div className="detail-layout-grid">
              <aside className="sticky-panel">
                <div className="panel-box">
                  <div className="panel-title-wrap">
                    <h3 className="panel-title">Ingredientes</h3>
                    <div className="servings-control">
                      <button className="servings-btn" onClick={() => handleServingChange(-1)}>-</button>
                      <span className="servings-num">{currentServings}p</span>
                      <button className="servings-btn" onClick={() => handleServingChange(1)}>+</button>
                    </div>
                  </div>

                  <ul className="ingredients-interactive-list">
                    {selectedRecipe.ingredients.map((ing, idx) => {
                      const scaledAmount = ((ing.amount / selectedRecipe.servings) * currentServings);
                      const displayAmount = Number.isInteger(scaledAmount)
                        ? scaledAmount
                        : scaledAmount.toFixed(1);

                      return (
                        <li
                          key={idx}
                          className={`ingredient-row ${checkedIngredients[idx] ? 'active' : ''}`}
                          onClick={() => toggleIngredient(idx)}
                        >
                          <div className="custom-checkbox">
                            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <span>
                            <strong className="ingredient-amount">{displayAmount} {ing.unit}</strong> {ing.item}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="chef-note-card">
                    <h5>Consejo del Chef</h5>
                    <p>"{selectedRecipe.chefTips}"</p>
                  </div>

                  <div className="timer-widget">
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1.2px', opacity: 0.8 }}>Temporizador de Cocina</span>
                    <div className="timer-display">{formatTimer(timerTime)}</div>
                    <div className="timer-actions">
                      <button className="timer-btn timer-btn-primary" onClick={() => startTimer(5)}>+5 Min</button>
                      <button className="timer-btn timer-btn-primary" onClick={() => startTimer(10)}>+10 Min</button>
                      <button className="timer-btn timer-btn-secondary" onClick={() => { setTimerActive(false); setTimerTime(0); }}>Reset</button>
                    </div>
                  </div>
                </div>
              </aside>

              <section>
                <div className="panel-box">
                  <div className="tracker-header">
                    <span className="tracker-title">Progreso de Preparación</span>
                    <span className="tracker-count">
                      {Object.values(completedSteps).filter(Boolean).length} de {selectedRecipe.steps.length} Pasos ({Math.round((Object.values(completedSteps).filter(Boolean).length / selectedRecipe.steps.length) * 100)}%)
                    </span>
                  </div>
                  <div className="tracker-bar-bg">
                    <div
                      className="tracker-bar-fill"
                      style={{ width: `${(Object.values(completedSteps).filter(Boolean).length / selectedRecipe.steps.length) * 100}%` }}
                    />
                  </div>

                  <div className="steps-timeline">
                    {selectedRecipe.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`step-card ${completedSteps[idx] ? 'done' : ''}`}
                        onClick={() => toggleStep(idx)}
                      >
                        <div className="step-card-num">{(idx + 1).toString().padStart(2, '0')}</div>
                        <div className="step-card-content">
                          <h4>{step.title}</h4>
                          <p>{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </main>
        )}

        <footer className="footer-gourmet">
          <div className="footer-main-content">
            <div className="footer-brand-info">
              <div className="footer-brand-header">
                <div className="footer-brand-icon">
                  <svg viewBox="0 0 24 24"><path d="M8.1 13.34l2.83-2.83L3.91 3.5a4 4 0 00-5.66 5.66l7.02 7.02 2.83-2.84zM14.88 11.53l6.37-6.37a2.5 2.5 0 00-3.54-3.54l-6.37 6.37 3.54 3.54zM12 15l-1.41 1.41 6.36 6.36a1 1 0 001.42 0l2.83-2.83a1 1 0 000-1.42L14.83 12.17 12 15z"/></svg>
                </div>
                <h3 className="footer-title">Recetario</h3>
              </div>
              <p className="footer-desc">
                Plataforma digital interactiva de alta gastronomía. Diseñada meticulosamente para acompañar a los apasionados de la cocina en cada paso.
              </p>
            </div>

            <div className="footer-quick-actions">
              <button className="footer-action-btn" onClick={() => scrollToSection('recetas')}>
                Explorar Recetas
                <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              </button>
              <button className="footer-action-btn" onClick={scrollToTop}>
                Volver Arriba
                <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              </button>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-copy">© Recetario Interactivo • Colección Gastronómica</div>
            <div className="footer-pill">Arquitectura React</div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;