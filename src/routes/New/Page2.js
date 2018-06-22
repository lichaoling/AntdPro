import { Component } from 'react';
import { ChartCard, MiniBar } from 'components/Charts';
import { Tooltip, Icon } from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip as BizTooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
} from 'bizcharts';

export default class Page2 extends Component {
  render() {
    const visitData = [
      {
        x: '2017-09-01',
        y: 100,
      },
      {
        x: '2017-09-02',
        y: 120,
      },
      {
        x: '2017-09-03',
        y: 88,
      },
      {
        x: '2017-09-04',
        y: 65,
      },
    ];
    const data = [
      { year: '2001', population: 41.8 },
      { year: '2002', population: 38 },
      { year: '2003', population: 33.7 },
      { year: '2004', population: 30.7 },
      { year: '2005', population: 25.8 },
      { year: '2006', population: 31.7 },
      { year: '2007', population: 33 },
      { year: '2008', population: 46 },
      { year: '2009', population: 38.3 },
      { year: '2010', population: 28 },
      { year: '2011', population: 42.5 },
      { year: '2012', population: 30.3 },
    ];

    return (
      <div>
        <ChartCard
          title="支付笔数"
          action={
            <Tooltip title="支付笔数反应交易质量">
              <Icon type="exclamation-circle-o" />
            </Tooltip>
          }
          total="6,500"
          contentHeight={46}
        >
          <MiniBar height={46} data={visitData} />
        </ChartCard>
        <Chart height={window.innerHeight * 0.6} data={data} forceFit>
          <Coord type="polar" />
          <BizTooltip />
          <Legend position="right" offsetY={-window.innerHeight * 0.6 / 2 + 120} offsetX={-60} />
          <Geom
            type="interval"
            color="year"
            position="year*population"
            style={{ lineWidth: 1, stroke: '#fff' }}
          />
        </Chart>
      </div>
    );
  }
}
