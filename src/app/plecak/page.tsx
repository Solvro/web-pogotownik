import { BackpackList } from "./list";

export default function BackpackPage() {
  return (
    <div className="mt-32 px-4 pb-8 lg:px-52">
      <h2 className="text-xl font-semibold">Plecak bezpieczeństwa</h2>
      <p className="mt-4 text-gray-600">Co powinieneś zabrać ze sobą?</p>
      <BackpackList />
    </div>
  );
}
