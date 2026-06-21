import Image from "next/image";
import { getBookingsByUserId } from "@/lib/api/booking";
import { getUserSession } from "@/lib/core/session";
import { Table } from "@heroui/react"; 
import { Eye, Calendar, User, ShieldCheck } from "lucide-react"; // Clear, descriptive icons

const MyBookings = async () => {
  const user = await getUserSession();
  const bookings = await getBookingsByUserId(user.id);
  console.log(bookings)

  // Helper functions for statuses matching your theme setup
  const getBookingStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-midnight-emerald/10 text-midnight-emerald";
      case "pending":
        return "bg-secondary/10 text-secondary border border-secondary/20";
      case "cancelled":
        return "bg-danger/10 text-danger";
      default:
        return "bg-surface-container-high text-muted";
    }
  };

  const getPaymentStatusStyles = (status) => {
    // Usually sessions/Stripe components mark success, paid, or pending
    if (status || status === "Paid") {
      return "text-midnight-emerald bg-emerald-500/10";
    }
    return "text-muted bg-surface-container";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-primary">My Bookings</h1>
        <p className="font-body text-sm text-muted mt-1">
          Manage your property reservations, tracking details and payment states.
        </p>
      </div>

      <div className="bg-surface rounded-3xl shadow-sm border border-border/40 overflow-hidden">
        <Table className="w-full text-left border-collapse">
          <Table.ScrollContainer>
            <Table.Content aria-label="Tenant bookings management table">
              <Table.Header className="bg-surface-container-low border-b border-border/60">
                <Table.Column isRowHeader className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                  Property Name
                </Table.Column>
                <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                  Booking Date / Info
                </Table.Column>
                <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                  Amount Paid
                </Table.Column>
                <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                  Booking Status
                </Table.Column>
                <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                  Payment Status
                </Table.Column>
                <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4 text-right">
                  Parties Details
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {!bookings || bookings.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={6} className="text-center font-body text-muted py-12">
                      No bookings found. You haven't placed any rental bookings yet.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  bookings.map((item) => (
                    <Table.Row
                      key={item._id}
                      className="border-b border-border/30 hover:bg-surface-container-lowest transition-colors duration-150"
                    >
                      {/* Property Name Column */}
                      <Table.Cell className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-20 h-14 rounded-md overflow-hidden bg-card flex-shrink-0 border border-border/40 relative">
                            <Image
                              src={item.image}
                              alt={item.title || "Property"}
                              
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-body text-sm font-semibold text-primary">
                              {item.title || "Untitled Property"}
                            </div>
                            <div className="font-body text-xs text-muted font-light mt-0.5">
                              {item.location || "Location N/A"}
                            </div>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Booking Date / Move In */}
                      <Table.Cell className="p-4">
                        <div className="flex items-center gap-2 font-body text-sm text-foreground">
                          <Calendar className="text-secondary" size={14} />
                          <span>{item.moveInDate || "N/A"}</span>
                        </div>
                        <div className="font-body text-xs text-muted mt-0.5 ml-5">
                          {item.rentType || "Monthly"} Base
                        </div>
                      </Table.Cell>

                      {/* Amount Paid Column */}
                      <Table.Cell className="p-4">
                        <div className="font-body text-sm font-semibold text-primary">
                          ${Number(item.price).toLocaleString()}
                        </div>
                        <div className="font-body text-xs text-muted font-light">
                          Verified Total
                        </div>
                      </Table.Cell>

                      {/* Booking Status Column */}
                      <Table.Cell className="p-4">
                        <span
                          className={`inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full tracking-wide uppercase ${getBookingStatusStyles(
                            item.BookingStatus
                          )}`}
                        >
                          {item.BookingStatus || "Pending"}
                        </span>
                      </Table.Cell>

                      {/* Payment Status Column */}
                      <Table.Cell className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-full tracking-wide uppercase ${getPaymentStatusStyles(
                            item.sessionId ? "Paid" : "Unpaid"
                          )}`}
                        >
                          {item.sessionId ? "Paid" : "Unpaid"}
                        </span>
                      </Table.Cell>

                      {/* Parties Details (Tenant & Owner Overview) */}
                      <Table.Cell className="p-4 text-right">
                        <div className="inline-flex flex-col text-xs text-left bg-surface-container-low p-2 rounded-xl border border-border/30 max-w-[240px]">
                          <div className="flex items-center gap-1 text-primary font-semibold border-b border-border/30 pb-1 mb-1">
                            <ShieldCheck size={12} className="text-secondary" />
                            <span>Owner: {item.ownerName || "N/A"}</span>
                          </div>
                          <div className="text-muted text-[11px] truncate mb-1">
                            Email: {item.ownerEmail}
                          </div>
                          <div className="flex items-center gap-1 text-foreground font-medium pt-0.5">
                            <User size={12} className="text-muted" />
                            <span>Tenant: {item.tenantFullName}</span>
                          </div>
                          <div className="text-muted text-[11px] font-light mt-0.5">
                            Phone: {item.contactNumber || "N/A"}
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
};

export default MyBookings;