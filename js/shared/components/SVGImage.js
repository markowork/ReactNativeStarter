/**
 * @providesModule components.SVGImage
 * @flow
 */

// THIS IS HEAVILY BASED ON react-native-svg-uri!
// Changes:
// * Fixed several errors/weird things (Flow)
// * Proper props and state declaration
// * SVG's width and height are properly read from w/h attributes on root
// * props.fill is renamed to props.tint and it also accepts numbers (as expected)
// * props.tint applies to both stroke and fill, and ONLY when not transparent

// This is a little bit of a band-aid since react-native-svg can't read contents of a file
// and react-native-svg-uri doesn't work properly on Android

import * as React from 'react';
import { View, ViewPropTypes } from 'react-native';
import xmldom from 'xmldom';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import { Colors } from 'Resources';

import Svg, { Circle, Ellipse, G, LinearGradient, RadialGradient, Line, Path, Polygon, Polyline, Rect, Symbol, Use, Defs, Stop } from 'react-native-svg';

const ACEPTED_SVG_ELEMENTS = [
    'svg',
    'g',
    'circle',
    'path',
    'rect',
    'linearGradient',
    'radialGradient',
    'stop',
    'ellipse',
    'polygon',
];

// Attributes from SVG elements that are mapped directly.
const SVG_ATTS = ['viewBox', 'width', 'height'];
const G_ATTS = ['id'];
const CIRCLE_ATTS = ['cx', 'cy', 'r', 'fill', 'stroke'];
const PATH_ATTS = ['d', 'fill', 'stroke'];
const RECT_ATTS = ['width', 'height', 'fill', 'stroke', 'x', 'y'];
const LINEARG_ATTS = ['id', 'x1', 'y1', 'x2', 'y2'];
const RADIALG_ATTS = ['id', 'cx', 'cy', 'r'];
const STOP_ATTS = ['offset'];
const ELLIPSE_ATTS = ['fill', 'cx', 'cy', 'rx', 'ry'];
const POLYGON_ATTS = ['points'];

const utils = {
    camelCase: value => value.replace(/-([a-z])/g, g => g[1].toUpperCase()),

    camelCaseNodeName: ({ nodeName, nodeValue }) => ({ nodeName: utils.camelCase(nodeName), nodeValue }),

    removePixelsFromNodeValue: ({ nodeName, nodeValue }) => ({ nodeName, nodeValue: nodeValue.replace('px', '') }),

    transformFills: (nodeName, nodeValue, fillProp) => {
        return { [utils.camelCase(nodeName)]: fillProp && (nodeName === 'fill' || nodeName === 'stroke') && nodeValue !== 'none' ? fillProp : nodeValue };
    },

    transformStyle: (nodeName, nodeValue, fillProp) => {
        if (nodeName === 'style') {
            return nodeValue.split(';')
                .reduce((acc, attribute) => {
                    const [property, value] = attribute.split(':');
                    if (property == '') {
                        return acc;
                    } else {
                        return { ...acc, ...utils.transformFills(property, value, fillProp) };
                    }
                }, {});
        }
        return null;
    },

    getEnabledAttributes: enabledAttributes => ({ nodeName }) => enabledAttributes.includes(nodeName),
};

let ind = 0;

type Props = {
    style?: ViewPropTypes.style,
    tint?: string | number,
    svgXmlData?: string | null,
    source?: string,
    width?: number,
    height?: number,
};

type State = {
    svgXmlData?: string | null,
};

export default class SVGImage extends React.Component<Props, State> {
    isComponentMounted: boolean;

    constructor(props: Props) {
        super(props);

        this.state = {
            svgXmlData: props.svgXmlData,
        };

        this.isComponentMounted = false;

        // Gets the image data from an URL or a static file
        if (props.source) {
            const source = resolveAssetSource(props.source) || {};
            this.fecthSVGData(source.uri);
        }
    }

    componentWillMount() {
        this.isComponentMounted = true;
    }

    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.source) {
            const source = resolveAssetSource(nextProps.source) || {};
            const oldSource = resolveAssetSource(this.props.source) || {};
            if (source.uri !== oldSource.uri) {
                this.fecthSVGData(source.uri);
            }
        }

        if (nextProps.svgXmlData && this.props.svgXmlData !== nextProps.svgXmlData) {
            this.setState({ svgXmlData: nextProps.svgXmlData });
        }
    }

    fecthSVGData = async(uri: any) => {
        let responseXML = null;
        try {
            const response = await fetch(uri);
            responseXML = await response.text();
        } catch (e) {
            console.error('ERROR SVG', e);
        } finally {
            if (this.isComponentMounted) {
                this.setState({ svgXmlData: responseXML });
            }
        }

        return responseXML;
    };

    createSVGElement = (node: any, childs: any) => {
        let componentAtts = {};
        const i = ind++;
        switch (node.nodeName) {
            case 'svg':
                componentAtts = this.obtainComponentAtts(node, SVG_ATTS);
                if (this.props.width && this.props.width >= 0) componentAtts.width = this.props.width;
                if (this.props.height && this.props.height >= 0) componentAtts.height = this.props.height;
                return <Svg key={ i } { ...componentAtts }>{childs}</Svg>;
            case 'g':
                componentAtts = this.obtainComponentAtts(node, G_ATTS);
                return <G key={ i } { ...componentAtts }>{childs}</G>;
            case 'path':
                componentAtts = this.obtainComponentAtts(node, PATH_ATTS);
                return <Path key={ i } { ...componentAtts }>{childs}</Path>;
            case 'circle':
                componentAtts = this.obtainComponentAtts(node, CIRCLE_ATTS);
                return <Circle key={ i } { ...componentAtts }>{childs}</Circle>;
            case 'rect':
                componentAtts = this.obtainComponentAtts(node, RECT_ATTS);
                return <Rect key={ i } { ...componentAtts }>{childs}</Rect>;
            case 'linearGradient':
                componentAtts = this.obtainComponentAtts(node, LINEARG_ATTS);
                return <Defs key={ i }><LinearGradient { ...componentAtts }>{childs}</LinearGradient></Defs>;
            case 'radialGradient':
                componentAtts = this.obtainComponentAtts(node, RADIALG_ATTS);
                return <Defs key={ i }><RadialGradient { ...componentAtts }>{childs}</RadialGradient></Defs>;
            case 'stop':
                componentAtts = this.obtainComponentAtts(node, STOP_ATTS);
                return <Stop key={ i } { ...componentAtts }>{childs}</Stop>;
            case 'ellipse':
                componentAtts = this.obtainComponentAtts(node, ELLIPSE_ATTS);
                return <Ellipse key={ i } { ...componentAtts }>{childs}</Ellipse>;
            case 'polygon':
                componentAtts = this.obtainComponentAtts(node, POLYGON_ATTS);
                return <Polygon key={ i } { ...componentAtts }>{childs}</Polygon>;
            default:
                return null;
        }
    };

    obtainComponentAtts = ({ attributes }: { attributes: any }, enabledAttributes: any) => {
        const styleAtts = {};
        const fillColor = this.props.tint && Colors.asString(this.props.tint);

        Array.from(attributes).forEach(({ nodeName, nodeValue }) => {
            Object.assign(styleAtts, utils.transformStyle(nodeName, nodeValue, fillColor));
        });

        const componentAtts = Array.from(attributes)
            .map(utils.camelCaseNodeName)
            .map(utils.removePixelsFromNodeValue)
            .filter(utils.getEnabledAttributes(enabledAttributes))
            .reduce((acc, { nodeName, nodeValue }) => ({
                ...acc,
                ...utils.transformFills(nodeName, nodeValue, fillColor),
            }), {});
        Object.assign(componentAtts, styleAtts);

        return componentAtts;
    };

    inspectNode = (node: any) => {
        // Process the xml node
        const arrayElements = [];

        // Only process accepted elements
        if (!ACEPTED_SVG_ELEMENTS.includes(node.nodeName))
            return null;
        // if have children process them.

        // Recursive function.
        if (node.childNodes && node.childNodes.length > 0) {
            for (let i = 0; i < node.childNodes.length; i++) {
                const nodo = this.inspectNode(node.childNodes[i]);
                if (nodo != null)
                    arrayElements.push(nodo);
            }
        }
        const element = this.createSVGElement(node, arrayElements);
        return element;
    };

    render() {
        try {
            if (this.state.svgXmlData == null) return null;
            const svgXmlData: string = this.state.svgXmlData;
            const inputSVG = svgXmlData.substring(svgXmlData.indexOf('<svg '), (svgXmlData.indexOf('</svg>') + 6));
            const doc = new xmldom.DOMParser().parseFromString(inputSVG);
            const rootSVG = this.inspectNode(doc.childNodes[0]);
            return (
                <View style={ this.props.style }>
                    { rootSVG }
                </View>
            );
        } catch (e) {
            console.error('ERROR SVG', e);
            return null;
        }
    }
}
