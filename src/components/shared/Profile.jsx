import React from 'react';
import { Card, Chip, Button } from "@heroui/react";
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  BadgePercent, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";
import { Gear } from "@gravity-ui/icons";
import Image from 'next/image';

const Profile = ({ user }) => {
  console.log(user);

  // Fallback data handling if props are rendering asynchronously
  if (!user) return <div className="text-muted text-sm font-body p-6">Loading user configuration...</div>;

  // Format dates gracefully
  const joinDate = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })
    : "N/A";

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 font-body text-foreground animate-in fade-in slide-in-from-bottom-2 duration-300">
      
      {/* Upper Feature Profile Banner Card */}
      <Card className="bg-surface border border-border/20 shadow-xl overflow-hidden rounded-3xl mb-8">
        <div className="h-32 bg-linear-to-r from-primary via-midnight-emerald to-secondary opacity-90 relative" />
        
        {/* Replacing CardBody with a responsive div wrapper */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end gap-5 rounded-full -mt-12">
          <Image
          src={user.image} 
            alt={user.name}
            width={100}
            height={100}
            className='rounded-full'
            />

          <div className="flex-1 min-w-0 pt-2 sm:pt-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight text-foreground truncate">
                {user.name || "User Identity"}
              </h1>
              <Chip 
                size="sm" 
                className="bg-secondary/15 text-secondary border border-secondary/30 font-semibold uppercase tracking-wider text-[10px]"
              >
                {user.role}
              </Chip>
            </div>
            <p className="text-muted text-sm flex items-center gap-1.5 font-medium">
              <Mail size={14} className="shrink-0" /> {user.email}
            </p>
          </div>

          <Button 
            variant="flat" 
            size="sm"
            className="bg-card hover:bg-surface-container-high border border-border/20 text-foreground font-semibold px-4 rounded-xl transition-all self-stretch sm:self-auto flex items-center justify-center gap-2"
          >
            <Gear size={16} />
            <span>Account Actions</span>
          </Button>

        </div>
      </Card>

      {/* Main Body Column Split Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Hand Block: Account Status Metric Pillars */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-surface border border-border/20 shadow-lg rounded-2xl p-5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4 block">
              Security & Tier
            </h3>
            
            <div className="space-y-4">
              {/* Account Level Verification Indicator row */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-card/60 border border-border/10">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck size={18} className="text-secondary" />
                  <span className="text-xs font-semibold">Verification</span>
                </div>
                {user.emailVerified ? (
                  <Chip size="sm" variant="flat" color="success" className="font-medium text-xs gap-1.5 flex items-center">
                    <CheckCircle2 size={12} />
                    <span>Verified</span>
                  </Chip>
                ) : (
                  <Chip size="sm" variant="flat" className="bg-danger/10 text-danger border border-danger/20 font-medium text-xs gap-1.5 flex items-center">
                    <XCircle size={12} />
                    <span>Pending</span>
                  </Chip>
                )}
              </div>

              {/* Service Subscription Plan Tier Block row */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-card/60 border border-border/10">
                <div className="flex items-center gap-2.5">
                  <BadgePercent size={18} className="text-secondary" />
                  <span className="text-xs font-semibold">Current Plan</span>
                </div>
                <span className="text-xs font-bold uppercase bg-primary/10 text-primary dark:text-champagne px-2.5 py-1 rounded-lg border border-primary/20">
                  {user.plan ? user.plan.replace('_', ' ') : "Free Tier"}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Hand Block: Detailed System Metadata Fields Info */}
        <div className="md:col-span-2">
          <Card className="bg-surface border border-border/20 shadow-lg rounded-2xl p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-5">
                Registration Metadata Details
              </h3>

              <div className="grid grid-cols-1 gap-5">
                {/* Joined Timestamp Container Element */}
                <div className="space-y-1.5 p-4 rounded-xl bg-card/40 border border-border/10 transition-colors hover:bg-card/70">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={12} /> Account Established
                  </label>
                  <p className="text-sm text-foreground font-semibold">
                    {joinDate}
                  </p>
                </div>

                {/* Custom Status Card Container Row */}
                <div className="space-y-1.5 p-4 rounded-xl bg-card/40 border border-border/10 transition-colors hover:bg-card/70">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <UserIcon size={12} /> Complete Username Allocation
                  </label>
                  <p className="text-sm text-foreground font-medium">
                    Allocated under the name <span className="font-bold text-secondary">"{user.name}"</span> using authentic credentials authority networks.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
};

export default Profile;



