import Constants from "./Constants";

export default class Animations {
    static animGoBack1 = {
        duration: Constants.durationStep,
        rotate: 0,
        ease: "linear",
        //onComplete: (() => this.animGoBack1.moment = null),
    }

    static animGoForward1 = {
        duration: Constants.durationStep,
        rotate: 0,
        ease: "linear",
        //onComplete: (() => this.animGoBack2.moment = null),
    }

    static animGoForward2 = {
        duration: Constants.durationStep,
        rotate: -31.4,
        ease: "linear",
        //onComplete: (() => this.animGoForward1.moment = null),
    }

    static animGoBack2 = {
        duration: Constants.durationStep,
        rotate: 31.4,
        ease: "linear",
        //onComplete: (() => this.animGoForward2.moment = null),
    }

    static animGoRight = [this.animGoBack2, this.animGoForward1, this.animGoForward2, this.animGoBack1];
    static animGoLeft = [this.animGoForward2, this.animGoBack1, this.animGoBack2, this.animGoForward1];
    //static animGoRight = [this.animGoBack2, this.animGoBack1];
    //static animGoLeft = [this.animGoForward2, this.animGoForward1];

    static animFallDown = {
        type: "to",
        duration: Constants.durationFallDown,
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

    static zeroAnim = {
        duration: 0,
    };
}
