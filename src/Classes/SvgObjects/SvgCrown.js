import React from "react";
import TweenOne from "rc-tween-one";
import Constants from "../../Models/Constants";
import SvgFunctions from "./SvgFunctions";
import Circle from "../GeometricalFigures/Circle";

export default class SvgCrown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circle: new Circle(props.cx, props.cy, Constants.crownR),
        }
    }

    height()
    {
        const k = window.innerWidth / Constants.fWidth;
        return Constants.crownHeight * k;
    }

    up()
    {
        const k = window.innerWidth / Constants.fWidth;
        return Constants.crownUp * k;
    }

    getTriangle(i)
    {
        const [cx, cy, rx, ry] = this.get_cx_cy_rx_ry();
        const count = Constants.crownCount, width = rx / count;
        let up1 = i;
        if (up1 > count / 2)
        {
            up1 = count - 1 - i;
        }
        let up2 = i + 1;
        if (up2 > count / 2)
        {
            up2 = count - up2;
        }
        return " L" + (cx - rx + (i * 2 + 1) * width) +
                ", " + (cy - ry - this.height() - up1 * this.up()) +

                " L" + (cx - rx + (i * 2 + 2) * width) +
                ", " + (cy - up2 * this.up());
    }

    get_cx_cy_rx_ry()
    {
        const cx = SvgFunctions.cx(this.props), cy = SvgFunctions.cy(this.props),
            rx = SvgFunctions.getEllipseRx(this.state.circle),
            ry = SvgFunctions.getEllipseRy(this.state.circle);
        return [cx, cy, rx, ry];
    }

    getCrownTriangles()
    {
        let triangles = "";
        for (let i = 0; i < Constants.crownCount; i++)
        {
            triangles += this.getTriangle(i) + " ";
        }
        return triangles;
    }

    render() {
        const [cx, cy, rx, ry] = this.get_cx_cy_rx_ry();
        return (
            <g visibility={this.props.visibility}>
                <TweenOne component="g" animation={null}>
                    <g>
                        <ellipse cx={cx} cy={cy} rx={rx} ry={ry}
                                 fill="#FFF700" stroke="#FFDE00" strokeWidth="2"/>
                        <path d={"M" + (cx - rx) +
                            ", " + (cy) +
                            this.getCrownTriangles()}
                            stroke="#FFDE00" strokeWidth="3" fill="#FFF700"/>
                    </g>
                </TweenOne>
            </g>
        )
    }
}
