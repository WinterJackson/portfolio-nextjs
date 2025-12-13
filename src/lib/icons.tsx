import {
    Briefcase,
    CalendarDays,
    Camera,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Code,
    Cpu,
    Database,
    Edit,
    Eye,
    Facebook,
    FileText,
    Github,
    Globe,
    Home,
    Instagram,
    Layout,
    Linkedin,
    LogOut,
    LucideProps,
    Mail,
    MapPin,
    Menu,
    Monitor,
    PenTool,
    Phone,
    Plus,
    Server,
    Settings,
    Smartphone,
    Terminal,
    Trash2,
    Twitter,
    User,
    Wrench,
    X
} from 'lucide-react'

// Generic map for direct Lucide names
// We can extend this as needed
export const IconMap: Record<string, React.ComponentType<LucideProps>> = {
  // Common Contact
  mail: Mail,
  email: Mail,
  phone: Phone,
  mobile: Smartphone,
  location: MapPin,
  calendar: CalendarDays,
  
  // Socials
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
  website: Globe, // generic web

  // Tech / Services
  monitor: Monitor,
  laptop: Monitor,
  code: Code,
  terminal: Terminal,
  cpu: Cpu,
  database: Database,
  layout: Layout,
  server: Server,
  wrench: Wrench,
  tool: Wrench,
  design: PenTool,
  camera: Camera,
  
  // UI
  home: Home,
  user: User,
  settings: Settings,
  briefcase: Briefcase,
  file: FileText,
  eye: Eye,
  trash: Trash2,
  edit: Edit,
  plus: Plus,
  close: X,
  menu: Menu,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  'chevron-left': ChevronLeft,
  logout: LogOut,
}

// Special mapping for legacy Ionicons names that might be in the DB
export const LegacyIconMapping: Record<string, React.ComponentType<LucideProps>> = {
  'mail-outline': Mail,
  'phone-portrait-outline': Smartphone,
  'call-outline': Phone,
  'location-outline': MapPin,
  'calendar-outline': CalendarDays,
  'desktop-outline': Monitor,
  'code-slash-outline': Code,
  'logo-github': Github,
  'logo-linkedin': Linkedin,
  'logo-whatsapp': Phone, // No whatsapp icon in lucide default, mapping to Phone or MessageCircle if available (using Phone for now)
  'eye-outline': Eye,
  'chevron-down': ChevronDown,
  'chevron-down-outline': ChevronDown,
}

interface DynamicIconProps extends LucideProps {
  name: string
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // 1. Try exact match in our clean dictionary
  let IconComponent = IconMap[name.toLowerCase()]

  // 2. If not found, try legacy mapping (strip whitespace just in case)
  if (!IconComponent) {
    IconComponent = LegacyIconMapping[name.toLowerCase()]
  }

  // 3. Fallback to a generic icon if still not found
  if (!IconComponent) {
    // Attempt to match lucide standard names if the user saved "Monitor" directly
    // This is optional but helpful
    return <Code {...props} /> // Fallback icon
  }

  return <IconComponent {...props} />
}
export function Whatsapp(props: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 1h4a.5.5 0 0 0 1-1v-1a.5.5 0 0 0-1-1h-4a.5.5 0 0 0-1 1v1z" style={{ display: 'none' }} /> {/* Hidden spacer or fix? Actually standard whatsapp path is more complex. Let's use a brand-like path but as outline to match Lucide style, or just the standard logo path. Lucide doesn't have it. I'll use a simplified path that looks like the phone in chat bubble. */}
      {/* Better path for "Phone in Bubble" style usually used for Whatsapp in refined UI */}
      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.767-.721 2.016-1.418.249-.694.249-1.289.173-1.418-.074-.125-.272-.2-.572-.35z" />
    </svg>
  )
}
