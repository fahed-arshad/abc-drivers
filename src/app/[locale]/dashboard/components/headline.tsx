type HeadlineProps = {
  title: string;
  icon: React.ComponentType;
};

function Headline({ title, icon }: HeadlineProps) {
  return (
    <div className="flex flex-row items-center gap-4">
      <HeadlineIcon icon={icon} />
      <h1 className="text-2xl lg:text-3xl">{title}</h1>
    </div>
  );
}

export default Headline;

type HeadlineIconProps = {
  icon: React.ComponentType;
};

function HeadlineIcon({ icon: Icon }: HeadlineIconProps) {
  return (
    <div className="bg-primary p-2 lg:p-3 rounded-full">
      <Icon />
    </div>
  );
}
