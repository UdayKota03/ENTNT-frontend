import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Calendar } from "../components/ui/calendar"; // Assuming this is a custom calendar component

const CalendarView = () => {
  const [pastDate, setPastDate] = React.useState<Date | undefined>(new Date());
  const [futureDate, setFutureDate] = React.useState<Date | undefined>(new Date());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card sx={{ p: 2, '&:hover': { boxShadow: 6 } }}>
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom>
            Past Communications
          </Typography>
          <Calendar
            mode="single"
            selected={pastDate}
            onSelect={setPastDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card sx={{ p: 2, '&:hover': { boxShadow: 6 } }}>
        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom>
            Upcoming Communications
          </Typography>
          <Calendar
            mode="single"
            selected={futureDate}
            onSelect={setFutureDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
