// @flow



import React, {Component} from 'react';

import Typography from 'material-ui/Typography';
import {styles} from '../common';

// 乘数乘以另一个数。
export const multiplier = <T>(by: number = 1) => (x: number) => x * by;

// percentPlotter 呈现工具提示，显示有效负载的值，后跟百分号。
export const percentPlotter = <T>(text: string, mapper: (T => T) = multiplier(1)) => (payload: T) => {
	const p = mapper(payload);
	if (typeof p !== 'number') {
		return null;
	}
	return (
		<Typography type='caption' color='inherit'>
			<span style={styles.light}>{text}</span> {p.toFixed(2)} %
		</Typography>
	);
};

// unit 包含bytePlotter的单位。
const unit = ['', 'Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'];

// simplifyBytes returns the simplified version of the given value followed by the unit.
const simplifyBytes = (x: number) => {
	let i = 0;
	for (; x > 1024 && i < 8; i++) {
		x /= 1024;
	}
	return x.toFixed(2).toString().concat(' ', unit[i], 'B');
};

// bytePlotter 呈现工具提示，它将有效负载显示为字节值。
export const bytePlotter = <T>(text: string, mapper: (T => T) = multiplier(1)) => (payload: T) => {
	const p = mapper(payload);
	if (typeof p !== 'number') {
		return null;
	}
	return (
		<Typography type='caption' color='inherit'>
			<span style={styles.light}>{text}</span> {simplifyBytes(p)}
		</Typography>
	);
};

// bytePlotter 呈现工具提示，它将有效负载显示为字节值，后跟'/s'。
export const bytePerSecPlotter = <T>(text: string, mapper: (T => T) = multiplier(1)) => (payload: T) => {
	const p = mapper(payload);
	if (typeof p !== 'number') {
		return null;
	}
	return (
		<Typography type='caption' color='inherit'>
			<span style={styles.light}>{text}</span> {simplifyBytes(p)}/s
		</Typography>
	);
};

export type Props = {
	active: boolean,
	payload: Object,
	tooltip: <T>(text: string, mapper?: T => T) => (payload: mixed) => null | React$Element<any>,
};

// CustomTooltip 采用工具提示功能，并使用它绘制图表的活动值。
class CustomTooltip extends Component<Props> {
	render() {
		const {active, payload, tooltip} = this.props;
		if (!active || typeof tooltip !== 'function') {
			return null;
		}
		return tooltip(payload[0].value);
	}
}

export default CustomTooltip;
