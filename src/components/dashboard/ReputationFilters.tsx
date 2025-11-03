import { useState } from 'react';
import { Calendar, MapPin, Clock, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';

interface FilterState {
  dateRange: string;
  timeRange: {
    from: string;
    to: string;
  };
  location: string;
  roomTypes: {
    deluxe: boolean;
    suite: boolean;
    standard: boolean;
    presidential: boolean;
    family: boolean;
    executive: boolean;
  };
}

export function ReputationFilters() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '',
    timeRange: { from: '', to: '' },
    location: '',
    roomTypes: {
      deluxe: true,
      suite: true,
      standard: true,
      presidential: false,
      family: true,
      executive: false,
    },
  });

  const handleClearAll = () => {
    setFilters({
      dateRange: '',
      timeRange: { from: '', to: '' },
      location: '',
      roomTypes: {
        deluxe: false,
        suite: false,
        standard: false,
        presidential: false,
        family: false,
        executive: false,
      },
    });
  };

  const handleApply = () => {
    console.log('Applying filters:', filters);
    // Add your filter logic here
  };

  return (
    <div className="w-[400px] bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
      {/* Header */}
      <h2 className="text-xl mb-6">Filters</h2>

      {/* Date Range */}
      <div className="mb-6">
        <Label className="text-sm mb-2 block">Date</Label>
        <Select value={filters.dateRange} onValueChange={(value) => setFilters({ ...filters, dateRange: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last7days">Last 7 days</SelectItem>
            <SelectItem value="last30days">Last 30 days</SelectItem>
            <SelectItem value="thisMonth">This month</SelectItem>
            <SelectItem value="lastMonth">Last month</SelectItem>
            <SelectItem value="custom">Custom range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Time Range */}
      <div className="mb-6">
        <Label className="text-sm mb-3 block">Time Range</Label>
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="time"
            placeholder="From"
            value={filters.timeRange.from}
            onChange={(e) => setFilters({ ...filters, timeRange: { ...filters.timeRange, from: e.target.value } })}
            className="text-sm"
          />
          <Input
            type="time"
            placeholder="To"
            value={filters.timeRange.to}
            onChange={(e) => setFilters({ ...filters, timeRange: { ...filters.timeRange, to: e.target.value } })}
            className="text-sm"
          />
        </div>
      </div>

      {/* Location/Branch */}
      <div className="mb-6">
        <Label className="text-sm mb-2 block">Location/Branch</Label>
        <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="downtown">Downtown Branch</SelectItem>
            <SelectItem value="airport">Airport Branch</SelectItem>
            <SelectItem value="beachfront">Beachfront Resort</SelectItem>
            <SelectItem value="city-center">City Center</SelectItem>
            <SelectItem value="suburban">Suburban Location</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Room Type */}
      <div className="mb-6">
        <Label className="text-sm mb-3 block">Room Type</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="deluxe"
              checked={filters.roomTypes.deluxe}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, roomTypes: { ...filters.roomTypes, deluxe: checked as boolean } })
              }
            />
            <label
              htmlFor="deluxe"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Deluxe
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="suite"
              checked={filters.roomTypes.suite}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, roomTypes: { ...filters.roomTypes, suite: checked as boolean } })
              }
            />
            <label
              htmlFor="suite"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Suite
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="standard"
              checked={filters.roomTypes.standard}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, roomTypes: { ...filters.roomTypes, standard: checked as boolean } })
              }
            />
            <label
              htmlFor="standard"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Standard
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="presidential"
              checked={filters.roomTypes.presidential}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, roomTypes: { ...filters.roomTypes, presidential: checked as boolean } })
              }
            />
            <label
              htmlFor="presidential"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Presidential
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="family"
              checked={filters.roomTypes.family}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, roomTypes: { ...filters.roomTypes, family: checked as boolean } })
              }
            />
            <label
              htmlFor="family"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Family
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="executive"
              checked={filters.roomTypes.executive}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, roomTypes: { ...filters.roomTypes, executive: checked as boolean } })
              }
            />
            <label
              htmlFor="executive"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Executive
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          className="flex-1 rounded-full"
          onClick={handleClearAll}
        >
          Clear all
        </Button>
        <Button
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
          onClick={handleApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
