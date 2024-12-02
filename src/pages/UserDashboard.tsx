import React, { useCallback, useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NotificationBadge from "./NotificationBadge";
import CompanyList from "./CompanyList";
import { communications } from "@/services/api";

const CommunicationCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [showDialog, setShowDialog] = React.useState(false);
  const [showAddEventDialog, setShowAddEventDialog] = React.useState(false);
  const [disabledEvents, setDisabledEvents] = React.useState<string[]>([]);
  const [newEvent, setNewEvent] = React.useState({
    type: "",
    company: "",
    notes: "",
  });
  const [comapanyWithEvents, setcomapanyWithEvents] = useState([]);

  // Mock dates with communications
  const [lastcommunicationDates, setlastcommunicationDates] = React.useState(
    []
  );
  const [upcommingcommunicationDates, setupcommingcommunicationDates] =
    React.useState([]);

  // Mock events data with past and upcoming communications
  const [events, setEvents] = React.useState({});

  const getallevents = useCallback(async () => {
    try {
      const result = await communications.getAlll();

      const groupedByCompany = result.reduce((acc: any, communication: any) => {
        const companyName = communication.company.name;
        const currentDate = new Date();

        // Initialize the company object with last, upcoming, and current arrays if it doesn't exist
        if (!acc[companyName]) {
          acc[companyName] = {
            name: companyName,
            last: [],
            upcoming: [],
            current: [],
          };
        }

        const eventDate = new Date(communication.date);

        // Extract the year, month, and day from the ISO date
        const year = eventDate.getUTCFullYear();
        const month = eventDate.getUTCMonth(); // Months are 0-indexed
        const day = eventDate.getUTCDate();

        // Create a new Date object using the year, month, and day
        const newDate = new Date(year, month, day);

        // Classify the event based on the eventDate compared to the currentDate
        if (eventDate < currentDate) {
          setlastcommunicationDates((prev) => [...prev, eventDate]);
          acc[companyName].last.push({
            name: communication.name,
            description: communication.description,
            mandatoryFlag: communication.mandatoryFlag,
            date: communication.date,
          }); // Past event
        } else {
          setupcommingcommunicationDates((prev) => [...prev, eventDate]);
          acc[companyName].upcoming.push({
            name: communication.name,
            description: communication.description,
            mandatoryFlag: communication.mandatoryFlag,
            date: communication.date,
          });
        }

        return acc;
      }, {});
      setcomapanyWithEvents(groupedByCompany);
      console.log(
        "Last : ",
        lastcommunicationDates,
        "Upcoming : ",
        upcommingcommunicationDates
      );
    } catch (error) {
      console.error("Error in getting all the events : ", error);
    }
  }, []);

  useEffect(() => {
    getallevents();
  }, [getallevents]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setShowDialog(true);
    }
  };

  const getEventsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    return events[dateKey as keyof typeof events] || [];
  };

  const toggleEventHighlight = (dateKey: string) => {
    setDisabledEvents((prev) =>
      prev.includes(dateKey)
        ? prev.filter((d) => d !== dateKey)
        : [...prev, dateKey]
    );
  };

  const handleAddEvent = () => {
    if (!date || !newEvent.type || !newEvent.company) return;

    const dateKey = format(date, "yyyy-MM-dd");
    const updatedEvents = {
      ...events,
      [dateKey]: [
        ...(events[dateKey as keyof typeof events] || []),
        { ...newEvent, status: "upcoming" },
      ],
    };

    setEvents(updatedEvents);
    setShowAddEventDialog(false);
    setNewEvent({ type: "", company: "", notes: "" });
  };

  const EventCard = ({ event, dateKey }: { event: any; dateKey: string }) => (
    <div className="relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200">
              <p className="font-medium text-sm text-indigo-800">{event?.company}</p>
              <p className="text-sm text-indigo-600">{event?.type}</p>
              <p className="text-sm mt-1 text-gray-700">{event?.notes}</p>
              <div className="mt-2 flex items-center gap-2">
                <Switch
                  checked={!disabledEvents.includes(dateKey)}
                  onCheckedChange={() => toggleEventHighlight(dateKey)}
                  className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-rose-500"
                />
                <span className="text-xs text-gray-500">
                  {disabledEvents.includes(dateKey)
                    ? "Highlight disabled"
                    : "Highlight enabled"}
                </span>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-800 text-white">
            <p>{event.notes}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <>
      <Card className="h-full m-4 shadow-2xl rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-col items-start justify-between p-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          <CardTitle className="text-2xl font-bold tracking-tight">Communication Events</CardTitle>
          <div className="flex items-center gap-4 mt-2">
            <Button
              onClick={() => setShowAddEventDialog(true)}
              className="bg-white text-indigo-700 hover:bg-gray-100 hover:text-indigo-800 transition-colors"
            >
              Add New Event
            </Button>
            <NotificationBadge />
          </div>
        </CardHeader>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-4 bg-gray-50 border-r border-gray-200">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Companies</h3>
            <CompanyList list={comapanyWithEvents} />
          </div>

          <div className="flex-1 p-4">
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                modifiers={{
                  lastcommunication: lastcommunicationDates,
                  upcomingcommunication: upcommingcommunicationDates,
                  lastEvent: lastcommunicationDates.filter(
                    (d) => !disabledEvents.includes(format(d, "yyyy-MM-dd"))
                  ),
                  upcomingEvent: upcommingcommunicationDates.filter(
                    (d) => !disabledEvents.includes(format(d, "yyyy-MM-dd"))
                  ),
                }}
                modifiersStyles={{
                  communication: {
                    backgroundColor: "#E6F3FF",
                    color: "#1A365D",
                    borderRadius: "50%",
                  },
                  lastEvent: {
                    backgroundColor: "#F56565",
                    color: "white",
                    borderRadius: "50%",
                  },
                  upcomingEvent: {
                    backgroundColor: "#48BB78",
                    color: "white",
                    borderRadius: "50%",
                  },
                  selected: {
                    backgroundColor: "#4299E1",
                    color: "white",
                    borderRadius: "50%",
                    boxShadow: "0 0 10px rgba(66, 153, 225, 0.5)",
                  },
                }}
                className="rounded-lg border-2 border-gray-200 shadow-sm"
              />

              <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold mb-3 text-gray-800 text-lg">
                  {date ? format(date, "MMMM d, yyyy") : "Select a date"}
                </h3>
                <div className="space-y-3">
                  {getEventsForDate(date).map((event, index) => (
                    <EventCard
                      key={index}
                      event={event}
                      dateKey={date ? format(date, "yyyy-MM-dd") : ""}
                    />
                  ))}
                  {date && getEventsForDate(date).length === 0 && (
                    <p className="text-sm text-gray-500 text-center">
                      No events for this date
                    </p>
                  )}
                </div>
              </div>

              {/* Add Event Dialog */}
              <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
                <DialogContent className="bg-white rounded-2xl shadow-2xl p-6">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-indigo-800">Add New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Event Type Selection */}
                    <Select
                      value={newEvent.type}
                      onValueChange={(value) =>
                        setNewEvent((prev) => ({ ...prev, type: value }))
                      }
                      className="w-full"
                    >
                      <SelectTrigger className="border-indigo-300 focus:border-indigo-500">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Email" className="hover:bg-indigo-50">Email</SelectItem>
                        <SelectItem value="LinkedIn" className="hover:bg-indigo-50">LinkedIn</SelectItem>
                        <SelectItem value="Meeting" className="hover:bg-indigo-50">Meeting</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Company Name Input */}
                    <Input
                      placeholder="Company name"
                      value={newEvent.company}
                      onChange={(e) =>
                        setNewEvent((prev) => ({
                          ...prev,
                          company: e.target.value,
                        }))
                      }
                      className="w-full border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    />

                    {/* Notes Input */}
                    <Input
                      placeholder="Notes"
                      value={newEvent.notes}
                      onChange={(e) =>
                        setNewEvent((prev) => ({
                          ...prev,
                          notes: e.target.value,
                        }))
                      }
                      className="w-full border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                    />

                    {/* Add Event Button */}
                    <Button
                      onClick={handleAddEvent}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
                    >
                      Add Event
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CommunicationCalendar;