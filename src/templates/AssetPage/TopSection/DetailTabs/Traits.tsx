import { v4 as uuidv4 } from "uuid";

function Traits({ traits }: { traits: Attribute[] }) {
  return (
    <div className="grid grid-cols-4 gap-2 3xl:grid-cols-3 2xl:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
      {traits.length > 1 ? (
        traits.map((trait) => (
          <div key={uuidv4()}>
            <Trait trait={trait} />
          </div>
        ))
      ) : (
        <div className="text-red-main font-body bg-white-6 p-4 rounded-lg border border-white-20">
          This asset contains no traits
        </div>
      )}
    </div>
  );
}

export default Traits;

const Trait = ({ trait }: { trait: Attribute }) => {
  return (
    <div className="bg-black-lighter-1 p-3 flex flex-col rounded-lg w-[209px] h-[100px] xs:mx-auto">
      <div className="flex justify-between mb-2">
        <p className="text-grey-lightest text-sm font-body opacity-65">
          {trait.Key}
        </p>
        <p className="text-green-bright text-sm font-body justify-self-end max-w-[100px] text-right">
          {trait.Value}
        </p>
      </div>
      <div className="flex justify-between mt-auto">
        <p className="text-grey-lightest text-sm font-body opacity-65">
          Percentage
        </p>
        <p className="text-grey-lightest text-sm font-body">{trait.Rarity}</p>
      </div>
    </div>
  );
};
