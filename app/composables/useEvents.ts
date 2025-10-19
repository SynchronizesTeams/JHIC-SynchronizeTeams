// ~/composables/useEvents.ts

import type { CalendarEvent } from "~/types/calendar";

const isValidDate = (d: string | null | undefined): boolean => {
  return !!d && d !== "0000-00-00";
};

export const useEvents = () => {
  const api = useApi();
  const events = ref<CalendarEvent[]>([]);
  const selectedEvent = ref<CalendarEvent | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchEvents = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response: any = await api.event.getAll();
      events.value = response || [];
      return events.value;
    } catch (err: any) {
      error.value = err.message || "Gagal memuat events";
      console.error("Error fetching events:", err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchEventsByDate = async (date: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response: any = await api.event.getByDate(date);
      return response;
    } catch (err: any) {
      error.value = err.message || "Gagal memuat events untuk tanggal ini";
      console.error("Error fetching events by date:", err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const fetchEventById = async (id: number) => {
    loading.value = true;
    error.value = null;

    try {
      const response: any = await api.event.getById(id);
      selectedEvent.value = response || null;
      return selectedEvent.value;
    } catch (err: any) {
      error.value = err.message || "Gagal memuat detail event";
      console.error("Error fetching event:", err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const fetchEventsByCategory = async (category: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response: any = await api.event.getByCategory(category);
      events.value = response || [];
      return events.value;
    } catch (err: any) {
      error.value = err.message || "Gagal memuat events berdasarkan kategori";
      console.error("Error fetching events by category:", err);
      return [];
    } finally {
      loading.value = false;
    }
  };

  const getEventsByDate = (dateString: string) => {
    return events.value.filter((event) => {
      let eventDate = event.event_date || event.start_date;
      let endDate = event.end_date || eventDate;

      if (!isValidDate(eventDate)) return false;
      if (!isValidDate(endDate)) endDate = eventDate;

      return dateString >= eventDate && dateString <= endDate;
    });
  };

  const getEventsByDateRange = (startDate: string, endDate: string) => {
    return events.value.filter((event) => {
      let eventStartDate = event.event_date || event.start_date;
      let eventEndDate = event.end_date || eventStartDate;

      if (!isValidDate(eventStartDate)) return false;
      if (!isValidDate(eventEndDate)) eventEndDate = eventStartDate;

      return (
        (eventStartDate >= startDate && eventStartDate <= endDate) ||
        (eventEndDate >= startDate && eventEndDate <= endDate) ||
        (eventStartDate <= startDate && eventEndDate >= endDate)
      );
    });
  };

  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split("T")[0];
    return events.value
      .filter((event) => {
        const eventDate = event.event_date || event.start_date;
        return isValidDate(eventDate) && eventDate >= today;
      })
      .sort((a, b) => {
        const dateA = a.event_date || a.start_date;
        const dateB = b.event_date || b.start_date;
        return dateA.localeCompare(dateB);
      });
  };

  const getPastEvents = () => {
    const today = new Date().toISOString().split("T")[0];
    return events.value
      .filter((event) => {
        const eventDate = event.event_date || event.start_date;
        return isValidDate(eventDate) && eventDate < today;
      })
      .sort((a, b) => {
        const dateA = a.event_date || a.start_date;
        const dateB = b.event_date || b.start_date;
        return dateB.localeCompare(dateA);
      });
  };

  return {
    events,
    selectedEvent,
    loading,
    error,
    fetchEvents,
    fetchEventsByDate, // tetap ada, tapi jangan dipakai untuk ganti state
    fetchEventById,
    fetchEventsByCategory,
    getEventsByDate,
    getEventsByDateRange,
    getUpcomingEvents,
    getPastEvents,
  };
};