import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../config/config";
import RatingStars from "../components/RatingStars";
import ReviewForm from "../components/ReviewForm";
import "../css/ProductDetails.css";

import shimlaApples from '../images/products/shimla-apples.jpg';
import robustaBananas from '../images/products/robusta-bananas.jpg';
import babySpinach from '../images/products/baby-spinach.jpg';
import romaTomatoes from '../images/products/roma-tomatoes.jpg';
import alphonsoMangoes from '../images/products/alphonso-mangoes.jpg';
import greenCapsicum from '../images/products/green-capsicum.jpg';
import cavendishBananas from '../images/products/cavendish-bananas.jpg';
import kashmiriOnions from '../images/products/kashmiri-onions.jpg';
import greenGrapes from '../images/products/green-grapes.jpg';
import kiwi from '../images/products/kiwi.jpg';
import okra from '../images/products/okra.jpg';
import brinjal from '../images/products/brinjal.jpg';
import ootyCarrots from '../images/products/ooty-carrots.jpg';
import coconut from '../images/products/coconut.jpg';
import ginger from '../images/products/ginger.jpg';
import garlic from '../images/products/garlic.jpg';
import greenChilli from '../images/products/green-chilli.jpg';
import coriander from '../images/products/coriander.jpg';
import mint from '../images/products/mint.jpg';
import cherryTomatoes from '../images/products/cherry-tomatoes.jpg';
import cucumber from '../images/products/cucumber.jpg';
import sweetPotato from '../images/products/sweet-potato.jpg';
import cauliflower from '../images/products/cauliflower.jpg';
import cabbage from '../images/products/cabbage.jpg';
import royalGalaApples from '../images/products/royal-gala-apples.jpg';
import washingtonApples from '../images/products/washington-apples.jpg';
import mosambi from '../images/products/mosambi.jpg';
import avocado from '../images/products/avocado.jpg';
import watermelon from '../images/products/watermelon.jpg';
import pomegranate from '../images/products/pomegranate.jpg';

// Dairy & Eggs (IDs 31-60)
import amulMilk from '../images/products/amul-milk.jpg';
import brownEggs from '../images/products/brown-eggs.jpg';
import amulButter from '../images/products/amul-butter.jpg';
import nestleDahi from '../images/products/nestle-dahi.jpg';
import amulCheeseSlices from '../images/products/amul-cheese-slices.jpg';
import motherDairyPaneer from '../images/products/mother-dairy-paneer.jpg';
import amulButtermilk from '../images/products/amul-buttermilk.jpg';
import britanniaCheeseSpread from '../images/products/britannia-cheese-spread.jpg';
import amulGold from '../images/products/amul-gold.jpg';
import goCheeseCubes from '../images/products/go-cheese-cubes.jpg';
import whiteEggs from '../images/products/white-eggs.jpg';
import motherDairyLassi from '../images/products/mother-dairy-lassi.jpg';
import amulKool from '../images/products/amul-kool.jpg';
import nestleSlim from '../images/products/nestle-slim.jpg';
import motherDairyCurd from '../images/products/mother-dairy-curd.jpg';
import amulVanilla from '../images/products/amul-vanilla.jpg';
import amulChocolate from '../images/products/amul-chocolate.jpg';
import britanniaChoco from '../images/products/britannia-choco.jpg';
import amulCream from '../images/products/amul-cream.jpg';
import goCheeseSpread from '../images/products/go-cheese-spread.jpg';
import amulChocolateMilk from '../images/products/amul-chocolate-milk.jpg';
import verkaGhee from '../images/products/verka-ghee.jpg';
import quark from '../images/products/quark.jpg';
import motherDairyChaach from '../images/products/mother-dairy-chaach.jpg';
import amulTaaza from '../images/products/amul-taaza.jpg';
import freeRangeEggs from '../images/products/free-range-eggs.jpg';
import amulPro from '../images/products/amul-pro.jpg';
import lactoseFree from '../images/products/lactose-free.jpg';
import lowFatDahi from '../images/products/low-fat-dahi.jpg';
import mithaiMate from '../images/products/mithai-mate.jpg';

// Bakery (IDs 61-90)
import britanniaBread from '../images/products/britannia-bread.jpg';
import britanniaCroissants from '../images/products/britannia-croissants.jpg';
import hideSeek from '../images/products/hide-seek.jpg';
import monginisCupcakes from '../images/products/monginis-cupcakes.jpg';
import modernBrown from '../images/products/modern-brown.jpg';
import britanniaPav from '../images/products/britannia-pav.jpg';
import englishOven from '../images/products/english-oven.jpg';
import harvestGold from '../images/products/harvest-gold.jpg';
import blackForest from '../images/products/black-forest.jpg';
import milkRusk from '../images/products/milk-rusk.jpg';
import milano from '../images/products/milano.jpg';
import brownies from '../images/products/brownies.jpg';
import fruitCake from '../images/products/fruit-cake.jpg';
import burgerBuns from '../images/products/burger-buns.jpg';
import garlicBread from '../images/products/garlic-bread.jpg';
import parleG from '../images/products/parle-g.jpg';
import marieGold from '../images/products/marie-gold.jpg';
import karachiBiscuits from '../images/products/karachi-biscuits.jpg';
import dutchTruffle from '../images/products/dutch-truffle.jpg';
import britanniaCakes from '../images/products/britannia-cakes.jpg';
import bunPao from '../images/products/bun-pao.jpg';
import almondCroissant from '../images/products/almond-croissant.jpg';
import blueberryMuffins from '../images/products/blueberry-muffins.jpg';
import cheeseDanish from '../images/products/cheese-danish.jpg';
import chocolateDoughnuts from '../images/products/chocolate-doughnuts.jpg';
import cinnamonRolls from '../images/products/cinnamon-rolls.jpg';
import oatmealCookies from '../images/products/oatmeal-cookies.jpg';
import brioche from '../images/products/brioche.jpg';
import focaccia from '../images/products/focaccia.jpg';
import sourdough from '../images/products/sourdough.jpg';

// Snacks & Beverages (IDs 91-120)
import laysClassic from '../images/products/lays-classic.jpg';
import cocaCola from '../images/products/coca-cola.jpg';
import haldiramsNuts from '../images/products/haldirams-nuts.jpg';
import dairyMilk from '../images/products/dairy-milk.jpg';
import pepsi from '../images/products/pepsi.jpg';
import tedheMedhe from '../images/products/tedhe-medhe.jpg';
import laysMagic from '../images/products/lays-magic.jpg';
import alooBhujia from '../images/products/aloo-bhujia.jpg';
import sprite from '../images/products/sprite.jpg';
import kurkure from '../images/products/kurkure.jpg';
import redBull from '../images/products/red-bull.jpg';
import jimJam from '../images/products/jim-jam.jpg';
import fiveStar from '../images/products/5-star.jpg';
import actIi from '../images/products/act-ii.jpg';
import thumsUp from '../images/products/thums-up.jpg';
import bournvita from '../images/products/bournvita.jpg';
import haldiramsSev from '../images/products/haldirams-sev.jpg';
import maaza from '../images/products/maaza.jpg';
import uncleChips from '../images/products/uncle-chips.jpg';
import minuteMaid from '../images/products/minute-maid.jpg';
import pringles from '../images/products/pringles.jpg';
import nescafe from '../images/products/nescafe.jpg';
import sevenUp from '../images/products/7up.jpg';
import madAngles from '../images/products/mad-angles.jpg';
import mountainDew from '../images/products/mountain-dew.jpg';
import bhujiaSev from '../images/products/bhujia-sev.jpg';
import frooti from '../images/products/frooti.jpg';
import laysCreamOnion from '../images/products/lays-cream-onion.jpg';
import moongDal from '../images/products/moong-dal.jpg';
import gems from '../images/products/gems.jpg';

// Household (IDs 121-150)
import vimLiquid from '../images/products/vim-liquid.jpg';
import origamiToilet from '../images/products/origami-toilet.jpg';
import surfExcel from '../images/products/surf-excel.jpg';
import garbageBags from '../images/products/garbage-bags.jpg';
import harpic from '../images/products/harpic.jpg';
import colin from '../images/products/colin.jpg';
import lizol from '../images/products/lizol.jpg';
import odonil from '../images/products/odonil.jpg';
import goodKnight from '../images/products/good-knight.jpg';
import vimBar from '../images/products/vim-bar.jpg';
import scotchBrite from '../images/products/scotch-brite.jpg';
import ariel from '../images/products/ariel.jpg';
import dettolHand from '../images/products/dettol-hand.jpg';
import exo from '../images/products/exo.jpg';
import hit from '../images/products/hit.jpg';
import pril from '../images/products/pril.jpg';
import surfExcelPowder from '../images/products/surf-excel-powder.jpg';
import comfort from '../images/products/comfort.jpg';
import domex from '../images/products/domex.jpg';
import rinBar from '../images/products/rin-bar.jpg';
import harpicBathroom from '../images/products/harpic-bathroom.jpg';
import tide from '../images/products/tide.jpg';
import aer from '../images/products/aer.jpg';
import scotchWipe from '../images/products/scotch-wipe.jpg';
import allOut from '../images/products/all-out.jpg';
import ezee from '../images/products/ezee.jpg';
import genteel from '../images/products/genteel.jpg';
import dettolLiquid from '../images/products/dettol-liquid.jpg';
import henko from '../images/products/henko.jpg';
import maxo from '../images/products/maxo.jpg';

// Meat & Seafood (IDs 151-180)
import chickenBreast from '../images/products/chicken-breast.jpg';
import salmon from '../images/products/salmon.jpg';
import mutton from '../images/products/mutton.jpg';
import prawns from '../images/products/prawns.jpg';
import chickenCurry from '../images/products/chicken-curry.jpg';
import pomfret from '../images/products/pomfret.jpg';
import lambChops from '../images/products/lamb-chops.jpg';
import mackerel from '../images/products/mackerel.jpg';
import drumsticks from '../images/products/drumsticks.jpg';
import tuna from '../images/products/tuna.jpg';
import porkRibs from '../images/products/pork-ribs.jpg';
import rohu from '../images/products/rohu.jpg';
import chickenWings from '../images/products/chicken-wings.jpg';
import kingFish from '../images/products/king-fish.jpg';
import lambMince from '../images/products/lamb-mince.jpg';
import squid from '../images/products/squid.jpg';
import chickenLiver from '../images/products/chicken-liver.jpg';
import tilapia from '../images/products/tilapia.jpg';
import turkey from '../images/products/turkey.jpg';
import bombayDuck from '../images/products/bombay-duck.jpg';
import chickenKeema from '../images/products/chicken-keema.jpg';
import hilsa from '../images/products/hilsa.jpg';
import lambShoulder from '../images/products/lamb-shoulder.jpg';
import crab from '../images/products/crab.jpg';
import chickenSausage from '../images/products/chicken-sausage.jpg';
import catfish from '../images/products/catfish.jpg';
import beefChuck from '../images/products/beef-chuck.jpg';
import clams from '../images/products/clams.jpg';
import gizzard from '../images/products/gizzard.jpg';
import norwegianSalmon from '../images/products/norwegian-salmon.jpg';

// Frozen Foods (IDs 181-210)
import mccainFries from '../images/products/mccain-fries.jpg';
import mixedVeg from '../images/products/mixed-veg.jpg';
import nuggets from '../images/products/nuggets.jpg';
import frozenPrawns from '../images/products/frozen-prawns.jpg';
import alooTikki from '../images/products/aloo-tikki.jpg';
import chickenKebab from '../images/products/chicken-kebab.jpg';
import frozenPeas from '../images/products/frozen-peas.jpg';
import mixedBerries from '../images/products/mixed-berries.jpg';
import smiles from '../images/products/smiles.jpg';
import chickenStrips from '../images/products/chicken-strips.jpg';
import fishFingers from '../images/products/fish-fingers.jpg';
import butterscotch from '../images/products/butterscotch.jpg';
import pizzaPockets from '../images/products/pizza-pockets.jpg';
import cornetto from '../images/products/cornetto.jpg';
import sweetCorn from '../images/products/sweet-corn.jpg';
import vegPatty from '../images/products/veg-patty.jpg';
import cassata from '../images/products/cassata.jpg';
import paratha from '../images/products/paratha.jpg';
import potatoBites from '../images/products/potato-bites.jpg';
import chickenSamosa from '../images/products/chicken-samosa.jpg';
import kulfi from '../images/products/kulfi.jpg';
import frozenSpinach from '../images/products/frozen-spinach.jpg';
import kesarPista from '../images/products/kesar-pista.jpg';
import veggieFingers from '../images/products/veggie-fingers.jpg';
import jumbo from '../images/products/jumbo.jpg';
import strawberryIcecream from '../images/products/strawberry-icecream.jpg';
import chickenPatty from '../images/products/chicken-patty.jpg';
import magnum from '../images/products/magnum.jpg';
import alooParatha from '../images/products/aloo-paratha.jpg';
import springRolls from '../images/products/spring-rolls.jpg';

// Personal Care (IDs 211-215)
import dove from '../images/products/dove.jpg';
import pantene from '../images/products/pantene.jpg';
import colgate from '../images/products/colgate.jpg';
import niveaFace from '../images/products/nivea-face.jpg';
import gillette from '../images/products/gillette.jpg';

// Baby Products (IDs 216-220)
import pampers from '../images/products/pampers.jpg';
import cerelac from '../images/products/cerelac.jpg';
import johnsons from '../images/products/johnsons.jpg';
import enfamil from '../images/products/enfamil.jpg';
import babyWipes from '../images/products/baby-wipes.jpg';

// Pet Supplies (IDs 221-225)
import pedigree from '../images/products/pedigree.jpg';
import whiskas from '../images/products/whiskas.jpg';
import collar from '../images/products/collar.jpg';
import catLitter from '../images/products/cat-litter.jpg';
import petToy from '../images/products/pet-toy.jpg';

// Breakfast & Cereal (IDs 226-230)
import cornflakes from '../images/products/cornflakes.jpg';
import quaker from '../images/products/quaker.jpg';
import nutella from '../images/products/nutella.jpg';
import upma from '../images/products/upma.jpg';
import masalaOats from '../images/products/masala-oats.jpg';

// Condiments & Sauces (IDs 231-235)
import kissan from '../images/products/kissan.jpg';
import hellmanns from '../images/products/hellmanns.jpg';
import maggiSauce from '../images/products/maggi-sauce.jpg';
import mustard from '../images/products/mustard.jpg';
import schezwan from '../images/products/schezwan.jpg';

// Canned & Packaged Foods (IDs 236-240)
import bakedBeans from '../images/products/baked-beans.jpg';
import cannedCorn from '../images/products/canned-corn.jpg';
import dalMakhani from '../images/products/dal-makhani.jpg';
import honey from '../images/products/honey.jpg';
import milkmaid from '../images/products/milkmaid.jpg';

// Health Foods & Supplements (IDs 241-245)
import ensure from '../images/products/ensure.jpg';
import ashwagandha from '../images/products/ashwagandha.jpg';
import weightGainer from '../images/products/weight-gainer.jpg';
import bournvitaPro from '../images/products/bournvita-pro.jpg';
import chyawanprash from '../images/products/chyawanprash.jpg';

// Home & Kitchen (IDs 246-250)
import pressureCooker from '../images/products/pressure-cooker.jpg';
import tawa from '../images/products/tawa.jpg';
import waterBottle from '../images/products/water-bottle.jpg';
import glassware from '../images/products/glassware.jpg';
import gasket from '../images/products/gasket.jpg';


const ProductDetails = () => {
    const productImages = {
        // Fruits & Vegetables (1-30)
        1: shimlaApples,
        2: robustaBananas,
        3: babySpinach,
        4: romaTomatoes,
        5: alphonsoMangoes,
        6: greenCapsicum,
        7: cavendishBananas,
        8: kashmiriOnions,
        9: greenGrapes,
        10: kiwi,
        11: okra,
        12: brinjal,
        13: ootyCarrots,
        14: coconut,
        15: ginger,
        16: garlic,
        17: greenChilli,
        18: coriander,
        19: mint,
        20: cherryTomatoes,
        21: cucumber,
        22: sweetPotato,
        23: cauliflower,
        24: cabbage,
        25: royalGalaApples,
        26: washingtonApples,
        27: mosambi,
        28: avocado,
        29: watermelon,
        30: pomegranate,
    
        // Dairy & Eggs (31-60)
        31: amulMilk,
        32: brownEggs,
        33: amulButter,
        34: nestleDahi,
        35: amulCheeseSlices,
        36: motherDairyPaneer,
        37: amulButtermilk,
        38: britanniaCheeseSpread,
        39: amulGold,
        40: goCheeseCubes,
        41: whiteEggs,
        42: motherDairyLassi,
        43: amulKool,
        44: nestleSlim,
        45: motherDairyCurd,
        46: amulVanilla,
        47: amulChocolate,
        48: britanniaChoco,
        49: amulCream,
        50: goCheeseSpread,
        51: amulChocolateMilk,
        52: verkaGhee,
        53: quark,
        54: motherDairyChaach,
        55: amulTaaza,
        56: freeRangeEggs,
        57: amulPro,
        58: lactoseFree,
        59: lowFatDahi,
        60: mithaiMate,
    
        // Bakery (61-90)
        61: britanniaBread,
        62: britanniaCroissants,
        63: hideSeek,
        64: monginisCupcakes,
        65: modernBrown,
        66: britanniaPav,
        67: englishOven,
        68: harvestGold,
        69: blackForest,
        70: milkRusk,
        71: milano,
        72: brownies,
        73: fruitCake,
        74: burgerBuns,
        75: garlicBread,
        76: parleG,
        77: marieGold,
        78: karachiBiscuits,
        79: dutchTruffle,
        80: britanniaCakes,
        81: bunPao,
        82: almondCroissant,
        83: blueberryMuffins,
        84: cheeseDanish,
        85: chocolateDoughnuts,
        86: cinnamonRolls,
        87: oatmealCookies,
        88: brioche,
        89: focaccia,
        90: sourdough,
    
        // Snacks & Beverages (91-120)
        91: laysClassic,
        92: cocaCola,
        93: haldiramsNuts,
        94: dairyMilk,
        95: pepsi,
        96: tedheMedhe,
        97: laysMagic,
        98: alooBhujia,
        99: sprite,
        100: kurkure,
        101: redBull,
        102: jimJam,
        103: fiveStar,
        104: actIi,
        105: thumsUp,
        106: bournvita,
        107: haldiramsSev,
        108: maaza,
        109: uncleChips,
        110: minuteMaid,
        111: pringles,
        112: nescafe,
        113: sevenUp,
        114: madAngles,
        115: mountainDew,
        116: bhujiaSev,
        117: frooti,
        118: laysCreamOnion,
        119: moongDal,
        120: gems,
    
        // Household (121-150)
        121: vimLiquid,
        122: origamiToilet,
        123: surfExcel,
        124: garbageBags,
        125: harpic,
        126: colin,
        127: lizol,
        128: odonil,
        129: goodKnight,
        130: vimBar,
        131: scotchBrite,
        132: ariel,
        133: dettolHand,
        134: exo,
        135: hit,
        136: pril,
        137: surfExcelPowder,
        138: comfort,
        139: domex,
        140: rinBar,
        141: harpicBathroom,
        142: tide,
        143: aer,
        144: scotchWipe,
        145: allOut,
        146: ezee,
        147: genteel,
        148: dettolLiquid,
        149: henko,
        150: maxo,
    
        // Meat & Seafood (151-180)
        151: chickenBreast,
        152: salmon,
        153: mutton,
        154: prawns,
        155: chickenCurry,
        156: pomfret,
        157: lambChops,
        158: mackerel,
        159: drumsticks,
        160: tuna,
        161: porkRibs,
        162: rohu,
        163: chickenWings,
        164: kingFish,
        165: lambMince,
        166: squid,
        167: chickenLiver,
        168: tilapia,
        169: turkey,
        170: bombayDuck,
        171: chickenKeema,
        172: hilsa,
        173: lambShoulder,
        174: crab,
        175: chickenSausage,
        176: catfish,
        177: beefChuck,
        178: clams,
        179: gizzard,
        180: norwegianSalmon,
    
        // Frozen Foods (181-210)
        181: mccainFries,
        182: mixedVeg,
        183: nuggets,
        184: frozenPrawns,
        185: alooTikki,
        186: chickenKebab,
        187: frozenPeas,
        188: mixedBerries,
        189: smiles,
        190: chickenStrips,
        191: fishFingers,
        192: butterscotch,
        193: pizzaPockets,
        194: cornetto,
        195: sweetCorn,
        196: vegPatty,
        197: cassata,
        198: paratha,
        199: potatoBites,
        200: chickenSamosa,
        201: kulfi,
        202: frozenSpinach,
        203: kesarPista,
        204: veggieFingers,
        205: jumbo,
        206: strawberryIcecream,
        207: chickenPatty,
        208: magnum,
        209: alooParatha,
        210: springRolls,
    
        // Personal Care (211-215)
        211: dove,
        212: pantene,
        213: colgate,
        214: niveaFace,
        215: gillette,
    
        // Baby Products (216-220)
        216: pampers,
        217: cerelac,
        218: johnsons,
        219: enfamil,
        220: babyWipes,
    
        // Pet Supplies (221-225)
        221: pedigree,
        222: whiskas,
        223: collar,
        224: catLitter,
        225: petToy,
    
        // Breakfast & Cereal (226-230)
        226: cornflakes,
        227: quaker,
        228: nutella,
        229: upma,
        230: masalaOats,
    
        // Condiments & Sauces (231-235)
        231: kissan,
        232: hellmanns,
        233: maggiSauce,
        234: mustard,
        235: schezwan,
    
        // Canned & Packaged Foods (236-240)
        236: bakedBeans,
        237: cannedCorn,
        238: dalMakhani,
        239: honey,
        240: milkmaid,
    
        // Health Foods & Supplements (241-245)
        241: ensure,
        242: ashwagandha,
        243: weightGainer,
        244: bournvitaPro,
        245: chyawanprash,
    
        // Home & Kitchen (246-250)
        246: pressureCooker,
        247: tawa,
        248: waterBottle,
        249: glassware,
        250: gasket
      };
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Add price formatting function
    const formatPrice = (price) => {
        if (price === null || price === undefined) return '0.00';
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };
    const fetchProduct = async () => {
      try {
          const response = await fetch(`${apiUrl}/products/${productId}`);
          if (!response.ok) throw new Error("Failed to fetch product");
          const data = await response.json();
          setProduct(data);
      } catch (error) {
          setError(error.message);
      }
  };
  const handleHelpful = async (reviewId) => {
    try {
      const response = await fetch(`${apiUrl}/api/reviews/${reviewId}/helpful`, {
        method: 'POST',
        credentials: 'include' // Required for cookies
      });
      
      if (!response.ok) throw new Error('Failed to update helpful count');
      
      const data = await response.json();
      
      // Update the reviews state with new helpful count
      setReviews(reviews.map(review => 
        review.review_id === reviewId 
          ? { ...review, helpful_count: data.helpfulCount } 
          : review
      ));
    } catch (error) {
      console.error('Error marking review helpful:', error);
      // Optionally show error to user
    }
  };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");
                
                const productResponse = await fetch(`${apiUrl}/products/${productId}`);
                if (!productResponse.ok) {
                    if (productResponse.status === 404) {
                        throw new Error("Product not found");
                    }
                    throw new Error("Failed to fetch product");
                }
                
                const reviewsResponse = await fetch(`${apiUrl}/products/${productId}/reviews`);
                
                const productData = await productResponse.json();
                const reviewsData = await reviewsResponse.json();
                
                setProduct(productData);
                setReviews(reviewsData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    const handleNewReview = (newReview) => {
        setReviews([newReview, ...reviews]);
        fetchProduct();
    };

    if (loading) return <div className="loading">Loading product...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="error">Product not found</div>;

    return (
        <div className="product-details">
          <div className="product-main">
            {/* Add image container div */}
            <div className="product-image-container">
              <img 
                src={productImages[product.product_id] || '/images/placeholder-product.jpg'}
                alt={product.name}
                className="product-image"
              />
            </div>
            
            <div className="product-info">
              <h1>{product.name}</h1>
              <div className="price-section">
                {product.discount_price ? (
                  <>
                    <span className="current-price">
                      ₹{formatPrice(product.discount_price)}
                    </span>
                    <span className="original-price">
                      ₹{formatPrice(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="current-price">
                    ₹{formatPrice(product.price)}
                  </span>
                )}
                <span className="unit">/ {product.unit}</span>
              </div>
              <div className="rating-section">
                <RatingStars rating={product.average_rating} />
                <span>({product.review_count} reviews)</span>
              </div>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          </div>

            <div className="reviews-section">
                <h2>Customer Reviews</h2>
                <ReviewForm productId={productId} onReviewSubmit={handleNewReview} />
                
                <div className="reviews-list">
                    {reviews.map(review => (
                        <div key={review.review_id} className="review">
                            <div className="review-header">
                                <h4>{review.user_name}</h4>
                                <div className="review-meta">
                                    <RatingStars rating={review.rating} />
                                    <span>{new Date(review.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <p>{review.comment}</p>
                            <div className="helpful-section">
                            <button 
                              className="helpful-button"
                              onClick={() => handleHelpful(review.review_id)}
                            >
                              Helpful ({review.helpful_count})
                            </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;