import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { useUser } from '../context/UserContext';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <Box style={{
        background: '',
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '8px'
      }}>
        <Typography color = 'text.main' variant='h6'>{data.day} ({data.date})</Typography>
        <Typography color = 'text.main'>Calories: {data.calories}</Typography>
        <Typography color = 'text.main'>Protein: {data.protein}g</Typography>
        <Typography color = 'text.main'>Carbs: {data.carbs}g</Typography>
        <Typography>Fat: {data.fat}g</Typography>
      </Box>
    );
  }
  return null;
};

export default function WeeklyProgress(){
  const {weeklyProgress} = useUser();


  return(
    <Card sx={{height: 460}}>
      <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <Typography sx={{fontWeight: 600}}>Weekly Progress</Typography>
        <Typography variant='caption'>Your nutrition intake over the past week</Typography>
            <ResponsiveContainer  height= {375} >
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis  />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#865DFF" 
                  strokeWidth={2}
                  dot={{ fill: 'primary.main', strokeWidth: 2, r: 4 }}
                />
                <RechartsTooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}