import Constants from "./Constants";

export default class Animations {
    static getAnimGoBack1(durationStep)
    {
        return {
            duration: durationStep / 4,
            rotate: 0,
            ease: "linear",
        };
    }

    static getAnimGoForward1(durationStep)
    {
        return {
            duration: durationStep / 4,
            rotate: 0,
            ease: "linear",
        }
    }

    static getAnimGoForward2(durationStep)
    {
        return {
            duration: durationStep / 4,
            rotate: -31.4,
            ease: "linear",
        }
    }

    static getAnimGoBack2(durationStep)
    {
        return {
            duration: durationStep / 4,
            rotate: 31.4,
            ease: "linear",
        }
    }

    static getAnimGoRight(durationStep)
    {
        return [
            this.getAnimGoBack2(durationStep),
            this.getAnimGoForward1(durationStep),
            this.getAnimGoForward2(durationStep),
            this.getAnimGoBack1(durationStep),
        ];
    }
    static getAnimGoLeft(durationStep)
    {
        return [
            this.getAnimGoForward2(durationStep),
            this.getAnimGoBack1(durationStep),
            this.getAnimGoBack2(durationStep),
            this.getAnimGoForward1(durationStep),
        ];
    }

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

    static dialogAppear = {
        duration: 1000,
        type: "from",
        opacity: 0,
    }

    static dialogShow = {
        duration: 1000,
    }

    static dialogDisappear = {
        duration: 1000,
        type: "to",
        opacity: 0,
    }

    static dialogAnimation = [this.dialogAppear, this.dialogShow, this.dialogDisappear];
}
