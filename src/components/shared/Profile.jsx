import React from 'react';
import { Card, Avatar, Chip, Button } from "@heroui/react";
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
          {/* <Avatar 
            src={user.image} 
            alt={user.name} 
            className="w-24 h-24 sm:w-28 sm:h-28 text-large border-4 border-surface shadow-md object-cover rounded-2xl bg-card"
            fallback={<UserIcon className="w-12 h-12 text-muted" />}
          /> */}

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
                <span className="text-xs font-bold uppercase text-foreground bg-primary/10 text-primary dark:text-champagne px-2.5 py-1 rounded-lg border border-primary/20">
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



// 'use client';

// import React from 'react';
// import { Avatar, Chip, Card, Button, Tooltip } from '@heroui/react';

// import {
//   Mail,
//   Shield,
//   Crown,
//   Calendar,
//   CheckCircle,
//   XCircle,
//   Copy,
//   ExternalLink,
//   Settings,
//   Bell,
//   LogOut,
//   Star,
//   Fingerprint,
// } from 'lucide-react';

// const PLAN_META = {
//   owner_free: { label: 'Owner Free', color: 'warning', icon: Crown },
//   pro: { label: 'Pro', color: 'secondary', icon: Star },
//   basic: { label: 'Basic', color: 'default', icon: Shield },
// };

// const ROLE_META = {
//   owner: { label: 'Owner', color: '#C5A059' },
//   admin: { label: 'Admin', color: '#00234B' },
//   user: { label: 'User', color: '#717878' },
// };

// const InfoRow = ({ icon: IconComp, label, value, extra }) => (
//   <div className="flex items-start gap-3 py-3">
//     <span className="mt-0.5 text-[var(--secondary)]">
//       <IconComp size={17} strokeWidth={1.8} />
//     </span>
//     <div className="flex-1 min-w-0">
//       <p className="text-xs font-medium uppercase tracking-widest text-[var(--on-surface-variant)] mb-0.5">
//         {label}
//       </p>
//       <p className="text-sm font-medium text-[var(--on-surface)] truncate">{value}</p>
//       {extra && <div className="mt-1">{extra}</div>}
//     </div>
//   </div>
// );

// const Profile = ({ user }) => {
//   const {
//     name = 'Unknown User',
//     email = '',
//     emailVerified = false,
//     image,
//     createdAt,
//     updatedAt,
//     role = 'user',
//     plan = 'basic',
//     id = '',
//   } = user || {};

//   const planMeta = PLAN_META[plan] || PLAN_META.basic;
//   const roleMeta = ROLE_META[role] || ROLE_META.user;
//   const PlanIcon = planMeta.icon;

//   const formatDate = (d) => {
//     if (!d) return '—';
//     return new Date(d).toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//     });
//   };

//   const shortId = id ? `…${id.slice(-8)}` : '—';

//   const copyId = () => {
//     if (id) navigator.clipboard.writeText(id);
//   };

//   const initials = name
//     .split(' ')
//     .map((n) => n[0])
//     .join('')
//     .toUpperCase()
//     .slice(0, 2);

//   return (
//     <div className="min-h-screen bg-[var(--background)] py-10 px-4">
//       {/* ── Page wrapper ── */}
//       <div className="max-w-2xl mx-auto space-y-5">

//         {/* ══ HERO CARD ══ */}
//         <Card
//           className="overflow-visible border border-[var(--outline-variant)] shadow-xl"
//           style={{ background: 'var(--surface-container-lowest)' }}
//         >
//           {/* Gold accent bar */}
//           <div
//             className="h-1.5 w-full rounded-t-xl"
//             style={{
//               background:
//                 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 55%, var(--champagne-accent) 100%)',
//             }}
//           />

//           <div className="pt-8 pb-8 px-8">
//             <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">

//               {/* Avatar + badges */}
//               <div className="relative shrink-0">
//                 <Avatar
//                   src={image}
//                   name={initials}
//                   size="lg"
//                   className="w-24 h-24 text-2xl font-semibold ring-4 ring-[var(--secondary)] ring-offset-2 ring-offset-[var(--surface-container-lowest)]"
//                   style={{ fontSize: '1.5rem' }}
//                 />
//                 {/* Role badge pinned to avatar */}
//                 <span
//                   className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow"
//                   style={{ background: roleMeta.color, whiteSpace: 'nowrap' }}
//                 >
//                   {roleMeta.label}
//                 </span>
//               </div>

//               {/* Name / email / plan chip */}
//               <div className="flex-1 text-center sm:text-left space-y-2">
//                 <h1
//                   className="text-2xl font-semibold tracking-tight"
//                   style={{ fontFamily: 'EB Garamond, serif', color: 'var(--on-background)' }}
//                 >
//                   {name}
//                 </h1>
//                 <p className="text-sm text-[var(--on-surface-variant)]">{email}</p>

//                 <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-1">
//                   {/* Plan chip */}
//                   <Chip
//                     color={planMeta.color}
//                     variant="flat"
//                     size="sm"
//                     startContent={<PlanIcon size={13} />}
//                     className="font-semibold tracking-wide"
//                   >
//                     {planMeta.label}
//                   </Chip>

//                   {/* Email verified chip */}
//                   <Chip
//                     color={emailVerified ? 'success' : 'danger'}
//                     variant="flat"
//                     size="sm"
//                     startContent={
//                       emailVerified ? <CheckCircle size={13} /> : <XCircle size={13} />
//                     }
//                   >
//                     {emailVerified ? 'Verified' : 'Unverified'}
//                   </Chip>
//                 </div>
//               </div>

//               {/* Action buttons top-right */}
//               <div className="flex gap-2 shrink-0">
//                 <Tooltip content="Settings" placement="bottom">
//                   <Button isIconOnly size="sm" variant="light" aria-label="Settings">
//                     <Settings size={17} className="text-[var(--on-surface-variant)]" />
//                   </Button>
//                 </Tooltip>
//                 <Tooltip content="Notifications" placement="bottom">
//                   <Button isIconOnly size="sm" variant="light" aria-label="Notifications">
//                     <Bell size={17} className="text-[var(--on-surface-variant)]" />
//                   </Button>
//                 </Tooltip>
//               </div>
//             </div>
//           </div>
//         </Card>

//         {/* ══ DETAILS CARD ══ */}
//         <Card
//           className="border border-[var(--outline-variant)] shadow-md"
//           style={{ background: 'var(--surface-container-lowest)' }}
//         >
//           <div className="px-8 py-2 divide-y divide-[var(--outline-variant)]">

//             <InfoRow
//               icon={Mail}
//               label="Email address"
//               value={email}
//               extra={
//                 <span className="flex items-center gap-1 text-xs" style={{ color: emailVerified ? '#16a34a' : 'var(--error)' }}>
//                   {emailVerified ? <CheckCircle size={11} /> : <XCircle size={11} />}
//                   {emailVerified ? 'Email verified' : 'Email not verified'}
//                 </span>
//               }
//             />

//             <InfoRow
//               icon={Shield}
//               label="Role"
//               value={role.charAt(0).toUpperCase() + role.slice(1)}
//             />

//             <InfoRow
//               icon={PlanIcon}
//               label="Plan"
//               value={planMeta.label}
//             />

//             <InfoRow
//               icon={Calendar}
//               label="Member since"
//               value={formatDate(createdAt)}
//             />

//             <InfoRow
//               icon={Calendar}
//               label="Last updated"
//               value={formatDate(updatedAt)}
//             />

//             <InfoRow
//               icon={Fingerprint}
//               label="User ID"
//               value={shortId}
//               extra={
//                 <button
//                   onClick={copyId}
//                   className="flex items-center gap-1 text-xs text-[var(--secondary)] hover:underline mt-0.5 cursor-pointer"
//                 >
//                   <Copy size={11} />
//                   Copy full ID
//                 </button>
//               }
//             />
//           </div>
//         </Card>

//         {/* ══ DANGER / ACTIONS CARD ══ */}
//         <Card
//           className="border border-[var(--outline-variant)] shadow-sm"
//           style={{ background: 'var(--surface-container-lowest)' }}
//         >
//           <div className="px-8 py-5">
//             <p
//               className="text-xs font-semibold uppercase tracking-widest text-[var(--on-surface-variant)] mb-4"
//             >
//               Account Actions
//             </p>
//             <div className="flex flex-wrap gap-3">
//               <Button
//                 size="sm"
//                 variant="flat"
//                 startContent={<ExternalLink size={14} />}
//                 className="font-medium"
//                 style={{ color: 'var(--on-background)', background: 'var(--surface-container)' }}
//               >
//                 View Public Profile
//               </Button>
//               <Button
//                 size="sm"
//                 variant="flat"
//                 color="danger"
//                 startContent={<LogOut size={14} />}
//                 className="font-medium"
//               >
//                 Sign Out
//               </Button>
//             </div>
//           </div>
//         </Card>

//         {/* ── subtle footer ── */}
//         <p className="text-center text-xs text-[var(--on-surface-variant)] pb-4">
//           Account ID: <span className="font-mono">{shortId}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Profile;