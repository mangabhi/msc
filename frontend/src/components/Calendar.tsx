import { useState, useMemo } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS } from 'date-fns/locale/en-US';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FileText, Plus } from "lucide-react";
import Header from "@/components/Header";

interface Assignment {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
}

const locales = {
    'en-US': enUS,
  };
  
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarPage = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    start: new Date(),
    end: new Date(),
  });

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    setNewAssignment({ start, end });
    setIsDialogOpen(true);
  };

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.start && newAssignment.end) {
      setAssignments([
        ...assignments,
        {
          id: Date.now().toString(),
          title: newAssignment.title,
          description: newAssignment.description || '',
          start: newAssignment.start,
          end: newAssignment.end,
        },
      ]);
      setIsDialogOpen(false);
      setNewAssignment({ start: new Date(), end: new Date() });
    }
  };

  const eventStyleGetter = () => ({
    style: {
      backgroundColor: '#3b82f6',
      borderRadius: '4px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    },
  });

  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: ['month', 'week', 'day'],
    }),
    []
  );

  return (
    <div className="app">
        <Header />
      <div className="container mx-auto p-4 mt-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Assignment Calendar</h1>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Assignment
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-4" style={{ height: '700px' }}>
          <BigCalendar
            localizer={localizer}
            events={assignments}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelect}
            eventPropGetter={eventStyleGetter}
            defaultDate={defaultDate}
            views={views}
          />
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Enter assignment title"
                  value={newAssignment.title || ''}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="Enter assignment description"
                  value={newAssignment.description || ''}
                  onChange={(e) =>
                    setNewAssignment({ ...newAssignment, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAssignment}>Add Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CalendarPage;