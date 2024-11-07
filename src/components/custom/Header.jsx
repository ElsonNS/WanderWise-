import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Link } from "react-router-dom";

function Header() {
  // Provide a fallback empty object if no user is found
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
    console.log(user.picture);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Failed to fetch user profile", err);
        toast("Failed to sign in, please try again.");
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-20">
      <img src="/logo.svg" alt="logo" />
      <div className="px-0 mr-0">
        {user && user.picture ? (
          <div className="flex items-center gap-3">
          <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full text-gray-600 border-gray-300"
              >
                + Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button
                variant="outline"
                className="rounded-full text-gray-600 border-gray-300"
              >
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpeg")}
                  className="h-[35px] w-[35px] rounded-full"
                  alt="User Profile"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              <h2 className="font-bold text-lg mt-">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication security</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 item-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
