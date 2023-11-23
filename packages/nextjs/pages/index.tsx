import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MetaHeader } from "~~/components/MetaHeader";
import { Dashboard } from "~~/components/home/Dashboard";
import { Intro } from "~~/components/home/Intro";

const Home: NextPage = () => {
  const { address } = useAccount();

  return (
    <>
      <MetaHeader />

      {address ? <Dashboard /> : <Intro />}
    </>
  );
};

export default Home;
