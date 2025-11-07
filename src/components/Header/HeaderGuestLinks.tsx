"use client";

import { useState } from "react";
import LoginDialog from "../LoginDialog";
import SignupDialog from "../SignupDialog";
import { Button } from "../ui/button";

const HeaderGuestLinks = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  return (
    <>
      <LoginDialog onOpenRegistration={() => setShowRegistration(true)}>
        <Button className="cursor-pointer" variant="outline">
          Login
        </Button>
      </LoginDialog>

      <SignupDialog open={showRegistration} onOpenChange={setShowRegistration}>
        <Button className="cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground">
          Share your Ride
        </Button>
      </SignupDialog>
    </>
  );
};

export default HeaderGuestLinks;
