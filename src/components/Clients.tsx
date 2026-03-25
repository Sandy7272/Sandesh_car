const clients = ["L&T Realty", "Kesari Weddings", "Ultraviolette", "Byju's", "Tata", "IBW 2025", "Italica", "Material Depot"];

const Clients = () => (
  <section className="section-padding">
    <div className="container-custom">
      <p className="section-label mb-12 text-center">Trusted By</p>
      <div className="flex flex-wrap justify-center gap-3">
        {clients.map((name) => (
          <span
            key={name}
            className="font-body text-sm border border-foreground/[0.08] text-muted-foreground px-6 py-2.5 rounded-full hover:border-primary hover:text-primary transition-smooth cursor-default"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Clients;
