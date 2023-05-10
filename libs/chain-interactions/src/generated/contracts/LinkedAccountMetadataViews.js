/** pragma type contract **/

import {
  getEnvironment,
  replaceImportAddresses,
  reportMissingImports,
  deployContract,
} from '@onflow/flow-cadut'

export const CODE = `
import MetadataViews from "./MetadataViews.cdc"

/// Metadata views relevant to identifying information about linked accounts
/// designed for use in the standard LinkedAccounts contract
///
pub contract LinkedAccountMetadataViews {

    /// Identifies information that could be used to determine the off-chain
    /// associations of a child account
    ///
    pub struct interface AccountMetadata {
        pub let name: String
        pub let description: String
        pub let creationTimestamp: UFix64
        pub let thumbnail: AnyStruct{MetadataViews.File}
        pub let externalURL: MetadataViews.ExternalURL
    }

    /// Simple metadata struct containing the most basic information about a
    /// linked account
    pub struct AccountInfo : AccountMetadata {
        pub let name: String
        pub let description: String
        pub let creationTimestamp: UFix64
        pub let thumbnail: AnyStruct{MetadataViews.File}
        pub let externalURL: MetadataViews.ExternalURL
        
        init(
            name: String,
            description: String,
            thumbnail: AnyStruct{MetadataViews.File},
            externalURL: MetadataViews.ExternalURL
        ) {
            self.name = name
            self.description = description
            self.creationTimestamp = getCurrentBlock().timestamp
            self.thumbnail = thumbnail
            self.externalURL = externalURL
        }
    }

    /// A struct enabling LinkedAccount.Handler to maintain implementer defined metadata
    /// resolver in conjunction with the default structs above
    ///
    pub struct interface MetadataResolver {
        pub fun getViews(): [Type]
        pub fun resolveView(_ view: Type): AnyStruct{AccountMetadata}?
    }
}
 
`;

/**
* Method to generate cadence code for LinkedAccountMetadataViews contract
* @param {Object.<string, string>} addressMap - contract name as a key and address where it's deployed as value
*/
export const LinkedAccountMetadataViewsTemplate = async (addressMap = {}) => {
  const envMap = await getEnvironment();
  const fullMap = {
  ...envMap,
  ...addressMap,
  };

  // If there are any missing imports in fullMap it will be reported via console
  reportMissingImports(CODE, fullMap, `LinkedAccountMetadataViews =>`)

  return replaceImportAddresses(CODE, fullMap);
};


/**
* Deploys LinkedAccountMetadataViews transaction to the network
* @param {Object.<string, string>} addressMap - contract name as a key and address where it's deployed as value
* @param Array<*> args - list of arguments
* param Array<string> - list of signers
*/
export const  deployLinkedAccountMetadataViews = async (props) => {
  const { addressMap = {} } = props;
  const code = await LinkedAccountMetadataViewsTemplate(addressMap);
  const name = "LinkedAccountMetadataViews"

  return deployContract({ code, name, processed: true, ...props })
}