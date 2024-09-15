import {Chart} from 'react-google-charts';
import debug from './debug';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from '@mui/material';
import {useState} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function DebugChart() {
  const [showDebugTimings, setShowDebugTimings] = useState<boolean>(false);

  const data = debug()?.getChartData();
  const options = {
    timeline: {
      groupByRowLabel: true,
    },
  };

  const renderTimeData = Object.entries(debug()?.timings.componentRenderTimes || {}).map(([component, times]) => [
    component,
    times.reduce((a, b) => a + b, 0) / times.length
  ]);

  const apiCallTimeData = Object.entries(debug()?.timings.apiCallTimes || {}).map(([api, times]) => [
    api,
    times.reduce((a, b) => a + b, 0) / times.length
  ]);

  return (
    <div className="horizontal-padding-sra text-chunk-sra">
      <Accordion
        expanded={showDebugTimings}
        onChange={() => setShowDebugTimings(!showDebugTimings)}
        elevation={0}
        sx={{border: 1, borderColor: 'rgba(0, 0, 0, 0.3)'}}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          className="debug-section">
          Debug Info
        </AccordionSummary>
        <AccordionDetails>
          {data && data.length > 1 ? (
            <>
              <Chart
                chartType="Timeline"
                data={data}
                width="100%"
                height="400px"
                options={options}
              />
              <Chart
                chartType="BarChart"
                width="100%"
                height="300px"
                data={[['Component', 'Average Render Time (ms)'], ...renderTimeData]}
                options={{title: 'Component Render Times'}}
              />
              <Chart
                chartType="BarChart"
                width="100%"
                height="300px"
                data={[['API Call', 'Average Call Time (ms)'], ...apiCallTimeData]}
                options={{title: 'API Call Times'}}
              />
              <Button
                variant="contained"
                sx={{marginBottom: 1}}
                onClick={() => {
                  debug()?.downloadInputAudio();
                  debug()?.downloadOutputAudio();
                }}>
                Download Input / Ouput Audio
              </Button>
            </>
          ) : (
            <Typography>No input / output detected</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
