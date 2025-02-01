export default function Banner({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 bg-[length:200%_200%] animate-gradient-move text-white py-10 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-md md:text-lg mb-2 animate-fade-in-delay">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
