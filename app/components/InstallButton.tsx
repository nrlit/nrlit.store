import { Button } from "@/components/ui/button";

interface Props {
  setIsOpen: (open: boolean) => void;
  Download: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function InstallButton({ setIsOpen, Download }: Props) {
  return (
    <Button
      onClick={() => setIsOpen(true)}
      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center space-x-2 rounded-full"
      aria-label="Open install dialog"
    >
      <Download className="w-5 h-5" />
      <span>Install NRLIT</span>
    </Button>
  );
}
