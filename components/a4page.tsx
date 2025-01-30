const A4Page = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-5/6 max-w-6xl rounded-xl border bg-card text-card-foreground shadow mx-auto p-3">
            {children}
        </div>
    );
};

export default A4Page;