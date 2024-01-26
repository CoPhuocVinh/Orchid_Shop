import ProtoTypes from "prop-types";

function TermsAndCondition({ name, activeTab }: any) {
  return (
    <div id="tab7" className={`tab-pane ${name === activeTab && "active"}`}>
      <div>
        <h3 className="text-2xl font-bold text-bgray-900 dark:text-white mb-3">
          Terms and Conditions
        </h3>
        <article className="mb-8">
          <h4 className="text-bgray-800 dark:text-white text-lg font-bold mb-2">
            1. Definitions
          </h4>
          <p className="text-[#9AA2B1] dark:text-white text-base">
            What you do own when you buy an are the keys to a non-fungible –
            perhaps unique – token. That token is yours to trade or hold or
            display in Decentraland. But the digital file associated with an NFT
            is just as easy to copy and paste and download as any other – the
            Finally, players lose their NFTs sometimes according to the rules
            and regulations of the NFT game.
          </p>
        </article>
        <article className="mb-8">
          <h4 className="text-bgray-800 dark:text-white text-lg font-bold mb-2">
            2. Acceptance
          </h4>
          <p className="text-[#9AA2B1] dark:text-white text-base">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.Capacity. You confirm that you
            have the legal capacity to receive and hold and make use of the NFT
            under French jurisdiction and any other relevant
            jurisdiction.Acceptance. By participating in the Sale, You accept
            and agree to these Terms and Conditions without any condition or
            restriction. If You do not agree to this Contract, You shall not
            participate in the Sale made by the Company Exercitation veniam
            consequat sunt nostrud amet.Capacity. You confirm that you have the
            legal capacity to receive and hold find to end.Contract, You shall
            not participate in the Sale made by the Company Exercitation venia
          </p>
        </article>
        <blockquote className="px-7 py-5 bg-bgray-100 dark:bg-darkblack-500 rounded-lg mb-8 text-lg text-bgray-800 dark:text-white">
          In reality, the most important aspect of a great dashboard is the part
          that gets the least amount of attention: The underlying data. More
          than any other aspect, the data will make or break a dashboard.Within
          this definition, successful administration appears to rest on three
          basic skills, which we will call technical, and conceptual.
        </blockquote>
        <article className="mb-8">
          <h4 className="text-bgray-800 dark:text-white text-lg font-bold mb-2">
            3. The Sale
          </h4>
          <p className="text-base text-[#9AA2B1] dark:text-white mb-6">
            The Company offers featuring the Betonyou universe. The holders of
            one or more NFTs will be able to win cryptos while playing video
            games. In the future, the Company plans to develop its own games and
            Metaverse around the Betonyou universe (“Project”).
          </p>
          <p className="text-base text-[#9AA2B1] dark:text-white">
            To release the NFTs and fund the project, the Company offers NFTs
            from a dedicated website Sale. The web address of this website
            will be given at the time of the mint. The NFT acquisition does not
            confer any rights on the Company or in the future development.
          </p>
        </article>
        <article>
          <h4 className="text-bgray-800 dark:text-white text-lg font-bold mb-2">
            4. Purchaser’s obligations
          </h4>
          <p className="text-base text-[#9AA2B1] dark:text-white mb-6">
            To the fullest extent permitted by applicable law, You undertake to
            indemnify, defend and hold harmless the Company from and against all
            claims, demands, actions, damages, losses, costs and expenses
            (including attorneys’ fees) that arise from or relate to (i) your
            Subscription or use of the NFTs; (ii) your responsibilities or
            obligations under this Contract; and (iii) your breach of this
            Contract.
          </p>
          <p className="text-base text-[#9AA2B1] dark:text-white">
            Company undertakes to act with the care normally expected from a
            professional in his field and to comply with the best practice in
            force. The best endeavor obligation only binds the Company.
          </p>
        </article>
      </div>
    </div>
  );
}

TermsAndCondition.propTypes = {
  name: ProtoTypes.string,
  activeTab: ProtoTypes.string,
};

export default TermsAndCondition;
