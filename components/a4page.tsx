import { useEffect, useState } from "react";

const A4Page = ({ children }: { children: React.ReactNode }) => {

    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
        const vw = window.innerWidth * 0.7;
        const baseWidth = 1000;
        const scaleFactor = vw / baseWidth
        setScale(scaleFactor);
        };

        // Calcola lo scale iniziale e aggiorna al resize della finestra
        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    return (
        <div 
            className="w-[1000px] rounded-xl border bg-card text-card-foreground shadow mx-auto p-3"
            style={{ transform: `scale(${scale})`,
                     marginTop: `${scale ** 5 * 30}px` }}
        >
            {children}
        </div>
    );
};

export default A4Page;