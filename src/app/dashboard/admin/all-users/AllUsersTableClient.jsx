"use client";

import { updateUser } from "@/lib/actions/user";
import { Table } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Hammer, Loader2, ShieldCheck, User, ChevronDown, Check, ShieldUser, ShieldUserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export default function AllUsersTableClient({ initialUsersData }) {
  const router = useRouter();
  const initialUsers=initialUsersData.data;
  const [users, setUsers] = useState(initialUsers);
  const [processingId, setProcessingId] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  const rolesList = [
    {
      value: "admin",
      label: "Admin",
      desc: "Full administrative dashboard control",
      color: "text-danger",
      bg: "bg-[#ffdad6]",
      border: "border-danger/30",
      dot: "bg-danger",
      icon: <ShieldUserIcon className="w-3.5 h-3.5" />,
    },
    {
      value: "owner",
      label: "Owner",
      desc: "Property listings management and hosting",
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/30",
      dot: "bg-secondary",
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
    {
      value: "tenant",
      label: "Tenant",
      desc: "Search portfolios and book structures",
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      dot: "bg-primary",
      icon: <User className="w-3.5 h-3.5" />,
    },
  ];

  const getRoleConfig = (role) =>
    rolesList.find((r) => r.value === role?.toString()?.toLowerCase()) ||
    rolesList[2];

  const handleRoleChange = async (userId, currentRole, newRole) => {
    if (!newRole || currentRole === newRole) return;

    setOpenDropdownId(null);
    setProcessingId(userId);
    const toastId = toast.loading("Updating role...");

    try {
      const data = await updateUser(userId, { role: newRole });
      if (data?.error) throw new Error(data.error);

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user,
        ),
      );

      toast.success(`Role updated to ${newRole.toUpperCase()}!`, { id: toastId });
      router.refresh();
    } catch (error) {
      console.error("Role Modifier Error:", error);
      toast.error(error.message || "Failed to update role.", { id: toastId });
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-surface rounded-3xl shadow-sm border border-border/40 overflow-hidden"
    >
      {/* ── Header — matches navbar style ── */}
      <div className="px-6 py-4 border-b border-border/20 bg-background/70 backdrop-blur-lg flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
            User <span className="text-secondary">Registry</span>
          </h2>
          <p className="font-body text-xs mt-0.5 text-muted">
            {users.length} active profiles in registry
          </p>
        </div>

        {/* Role legend */}
        <div className="hidden sm:flex items-center gap-4">
          {rolesList.map((r) => (
            <div key={r.value} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${r.dot}`} />
              <span className="font-body text-[11px] text-muted">
                {r.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Table className="w-full text-left border-collapse">
        <Table.ScrollContainer>
          <Table.Content aria-label="SmartNest administrative system users registry">

            {/* ── Column headers — original style ── */}
            <Table.Header className="bg-surface-container-low border-b border-border/60">
              <Table.Column
                isRowHeader
                className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4"
              >
                User Profile Information
              </Table.Column>
              <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                Current Role Status
              </Table.Column>
              <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4">
                Registered Date
              </Table.Column>
              <Table.Column className="font-body text-xs font-semibold uppercase tracking-wider text-muted p-4 text-right">
                Modify Permissions
              </Table.Column>
            </Table.Header>

            {/* ── Rows ── */}
            <Table.Body>
              {users.length === 0 ? (
                <Table.Row>
                  <Table.Cell
                    colSpan={4}
                    className="text-center font-body text-muted py-14"
                  >
                    No active user records registered in your framework catalog.
                  </Table.Cell>
                </Table.Row>
              ) : (
                users.map((user) => {
                  const userRole =
                    user.role?.toString()?.toLowerCase() || "tenant";
                  const roleConfig = getRoleConfig(userRole);
                  const isOpen = openDropdownId === user._id;

                  return (
                    <Table.Row
                      key={user._id}
                      className="border-b border-border/20 bg-surface hover:bg-card transition-colors duration-150"
                    >
                      {/* Profile */}
                      <Table.Cell className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border/40 relative">
                              <Image
                                src={user.image || "https://placehold.co/100x100?text=U"}
                                alt={user.name || "User"}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                            {/* Role-coloured pip */}
                            <span
                              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface ${roleConfig.dot}`}
                            />
                          </div>
                          <div>
                            <div className="font-body text-sm font-semibold text-primary">
                              {user.name || "Anonymous System Profile"}
                            </div>
                            <div className="font-body text-xs text-muted font-light mt-0.5">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Role badge */}
                      <Table.Cell className="p-4">
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-body text-xs font-semibold capitalize
                            ${roleConfig.color} ${roleConfig.bg} ${roleConfig.border}`}
                        >
                          {roleConfig.icon}
                          {userRole}
                        </div>
                      </Table.Cell>

                      {/* Date */}
                      <Table.Cell className="p-4">
                        <div className="font-body text-xs text-muted">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "N/A"}
                        </div>
                      </Table.Cell>

                      {/* Role selector */}
                      <Table.Cell className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {processingId === user._id && (
                            <Loader2 className="w-4 h-4 animate-spin text-secondary" />
                          )}

                          <div className="w-48 text-left relative" ref={dropdownRef}>
                            {/* Trigger */}
                            <button
                              type="button"
                              disabled={processingId !== null}
                              onClick={() =>
                                setOpenDropdownId(isOpen ? null : user._id)
                              }
                              className={`w-full border rounded-xl px-3 py-2 flex items-center justify-between
                                font-body text-xs font-semibold cursor-pointer transition-all duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed
                                ${roleConfig.color} ${roleConfig.bg} ${roleConfig.border}
                                ${isOpen ? "ring-2 ring-secondary/60" : ""}`}
                            >
                              <div className="flex items-center gap-1.5">
                                {roleConfig.icon}
                                <span>{roleConfig.label}</span>
                              </div>
                              <ChevronDown
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                              />
                            </button>

                            {/* Popover */}
                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                  transition={{ duration: 0.15, ease: "easeOut" }}
                                  className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border/60 shadow-xl rounded-2xl overflow-hidden p-1.5 z-50"
                                >
                                  {/* Champagne accent line */}
                                  <div className="h-0.5 rounded-full mb-1.5 mx-1 bg-champagne/60" />

                                  {rolesList.map((role) => {
                                    const isSelected = userRole === role.value;
                                    return (
                                      <button
                                        type="button"
                                        key={role.value}
                                        onClick={() =>
                                          handleRoleChange(user._id, userRole, role.value)
                                        }
                                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150
                                          flex items-start justify-between gap-2
                                          ${isSelected
                                            ? `${role.bg} ${role.border} border`
                                            : "hover:bg-card border border-transparent"
                                          }`}
                                      >
                                        <div className="flex items-start gap-2.5">
                                          <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${role.dot}`} />
                                          <div>
                                            <span className={`font-body text-xs font-semibold block ${role.color}`}>
                                              {role.label}
                                            </span>
                                            <span className="font-body text-[10px] text-muted block mt-0.5 leading-relaxed">
                                              {role.desc}
                                            </span>
                                          </div>
                                        </div>
                                        {isSelected && (
                                          <Check className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${role.color}`} />
                                        )}
                                      </button>
                                    );
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        {/* ── Footer — original style ── */}
        <Table.Footer className="p-4 bg-surface-container-lowest border-t border-border/40 text-xs font-body text-muted">
          Active Registry Users: {users.length} profiles listed
        </Table.Footer>
      </Table>
    </motion.div>
  );
}