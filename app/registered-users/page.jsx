import React from "react";
import UserTable from "./component/UserTable";

function RegisteredUserPage() {
  return (
    <>
      <header className="text-center pt-28">
        <h2 className="text-5xl text-slate-900">Registered Users</h2>
      </header>
      <main className="min-h-screen py-24">
        <UserTable />
      </main>
    </>
  );
}

export default RegisteredUserPage;