import { AxiosError } from "axios";
import Button from "./button/Button";
import Error from "./Error";

type Props = {
  type?: "save-form";
  error: AxiosError | null;
  loading: boolean;
  className?: string
};

const Actions = ({ type = "save-form", error, loading, className }: Props) => {
  if (!type) return;

  if (type === "save-form") {
    return (
      <div className={`${className ?? className} gap-4 flex justify-end lg:justify-between lg:flex-row flex-col items-end lg:items-center`}>
        <div className="max-lg:order-2">
          <Error error={error} />
        </div>
        <Button className="max-lg:order-1" loading={loading} type="submit">
          Simpan
        </Button>
      </div>
    );
  }
};

export default Actions;
