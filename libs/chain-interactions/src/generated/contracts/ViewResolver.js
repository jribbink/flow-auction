/** pragma type contract **/

import {
  getEnvironment,
  replaceImportAddresses,
  reportMissingImports,
  deployContract,
} from '@onflow/flow-cadut'

export const CODE = `
// Taken from the NFT Metadata standard, this contract exposes an interface to let 
// anyone borrow a contract and resolve views on it.
//
// This will allow you to obtain information about a contract without necessarily knowing anything about it.
// All you need is its address and name and you're good to go!
pub contract interface ViewResolver {
    /// Function that returns all the Metadata Views implemented by the resolving contract
    ///
    /// @return An array of Types defining the implemented views. This value will be used by
    ///         developers to know which parameter to pass to the resolveView() method.
    ///
    pub fun getViews(): [Type] {
        return []
    }

    /// Function that resolves a metadata view for this token.
    ///
    /// @param view: The Type of the desired view.
    /// @return A structure representing the requested view.
    ///
    pub fun resolveView(_ view: Type): AnyStruct? {
        return nil
    }
}
 
`;

/**
* Method to generate cadence code for ViewResolver contract
* @param {Object.<string, string>} addressMap - contract name as a key and address where it's deployed as value
*/
export const ViewResolverTemplate = async (addressMap = {}) => {
  const envMap = await getEnvironment();
  const fullMap = {
  ...envMap,
  ...addressMap,
  };

  // If there are any missing imports in fullMap it will be reported via console
  reportMissingImports(CODE, fullMap, `ViewResolver =>`)

  return replaceImportAddresses(CODE, fullMap);
};


/**
* Deploys ViewResolver transaction to the network
* @param {Object.<string, string>} addressMap - contract name as a key and address where it's deployed as value
* @param Array<*> args - list of arguments
* param Array<string> - list of signers
*/
export const  deployViewResolver = async (props) => {
  const { addressMap = {} } = props;
  const code = await ViewResolverTemplate(addressMap);
  const name = "ViewResolver"

  return deployContract({ code, name, processed: true, ...props })
}