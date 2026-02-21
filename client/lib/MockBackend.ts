export interface Application {
  id: string;
  schemeName: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
  userId: string;
}

export interface Booking {
  id: string;
  equipmentName: string;
  date: string;
  duration: number;
  status: "Confirmed" | "Cancelled";
  userId: string;
}

class MockBackend {
  private applications: Application[] = [];
  private bookings: Booking[] = [];

  constructor() {
    const savedApps = localStorage.getItem("techspark_apps");
    if (savedApps) this.applications = JSON.parse(savedApps);

    const savedBookings = localStorage.getItem("techspark_bookings");
    if (savedBookings) this.bookings = JSON.parse(savedBookings);
  }

  private save() {
    localStorage.setItem("techspark_apps", JSON.stringify(this.applications));
    localStorage.setItem("techspark_bookings", JSON.stringify(this.bookings));
  }

  getApplications(userId: string) {
    return this.applications.filter(app => app.userId === userId);
  }

  addApplication(app: Omit<Application, "id" | "date" | "status">) {
    const newApp: Application = {
      ...app,
      id: "APP-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toLocaleDateString(),
      status: "Pending"
    };
    this.applications.push(newApp);
    this.save();
    return newApp;
  }

  getBookings(userId: string) {
    return this.bookings.filter(b => b.userId === userId);
  }

  addBooking(booking: Omit<Booking, "id" | "status">) {
    const newBooking: Booking = {
      ...booking,
      id: "BK-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: "Confirmed"
    };
    this.bookings.push(newBooking);
    this.save();
    return newBooking;
  }
}

export const backend = new MockBackend();
