// Load Styles
import './styles/calculator.scss';

// Setup GSAP (Animation Library)
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

// Load Main JS
import './js/calculator';

// Add Event Listeners
import './js/event-listeners';