import Constants from "./Constants";

export default class Animations {
    static animGoBack1 = {
        duration: Constants.durationStep,
        rotate: 0,
        ease: "linear",
    }

    static animGoForward1 = {
        duration: Constants.durationStep,
        rotate: 0,
        ease: "linear",
    }

    static animGoForward2 = {
        duration: Constants.durationStep,
        rotate: -30,
        ease: "linear",
    }

    static animGoBack2 = {
        duration: Constants.durationStep,
        rotate: 30,
        ease: "linear"
    }

    static animGoRight = [this.animGoBack2, this.animGoForward1, this.animGoForward2, this.animGoBack1];
    static animGoLeft = [this.animGoForward2, this.animGoBack1, this.animGoBack2, this.animGoForward1];

    static animFallDown = {
        type: "to",
        duration: Constants.durationStep,
        opacity: -1,
        x: 0,
        y: 100,
        onComplete: null,
        ease: "linear",
    }

    static crownAnim = {
        duration: Constants.durationStep,
        y: -100,
        ease: "linear",
    }
}
