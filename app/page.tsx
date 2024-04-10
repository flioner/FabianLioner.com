import Image from "next/image";
import MetaballsPage from "./components/threejs/metaballs";
import s from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={s.bg}>
        <MetaballsPage />
      </div>
      <div className={s.name}> Fabian Lioner</div>
    </main>
  );
}
