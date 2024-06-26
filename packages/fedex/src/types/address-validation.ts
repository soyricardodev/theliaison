/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
	"/address/v1/addresses/resolve": {
		parameters: {
			query?: never;
			header?: never;
			path?: never;
			cookie?: never;
		};
		get?: never;
		put?: never;
		/**
		 * Validate Address
		 * @description Use this endpoint to get address resolution details. These details are the outcome of validation andddd resolution of the input address. An address is stated assss resolved when the input address matches the known reference data...<br><i>Note: FedEx APIs do not support Cross-Origin Resource Sharing (CORS) mechanism.<i>
		 */
		post: operations["Validate Address"];
		delete?: never;
		options?: never;
		head?: never;
		patch?: never;
		trace?: never;
	};
}
export type webhooks = Record<string, never>;
export interface components {
	schemas: {
		/** @description Wrapper class for AddressResolutionOutputVO. It holds transactionId and output. */
		AdvcResponseVO: {
			/**
			 * @description Unique identifier returned in the reply and helps you match the request to the reply.<br>Example: XXX_ORDERXXXX789
			 * @example XXX_ORDERXXXX789
			 */
			transactionId?: string;
			/**
			 * @description This element allows you to assign a unique identifier to your transaction. This element is also returned in the reply and helps you match the request to the reply. <br><br> Example: XXX_ORDERXXXX789
			 * @example AnyCo_order123456789
			 */
			customerTransactionId?: string;
			output?: components["schemas"]["BaseProcessOutputVO"];
		};
		BaseProcessOutputVO: components["schemas"]["AddressResolutionOutputVOV3"];
		/** @description Indicates the resolved address parameters. */
		AddressResolutionOutputVOV3: {
			/** @description Indicates the list of resolved addresses. The detailed resolved address includes city, state, postal information, and resolution method. */
			resolvedAddresses?: components["schemas"]["ResolvedAddress"][];
			/** @description Indicates API Alerts includes alert type, alert code, and alert message that is received when the address is resolved. */
			alerts?: components["schemas"]["Alert"][];
		};
		ResolvedAddress: {
			/**
			 * @description Indicates the resolved street address lines.<br>Example: [\"7372 PARKRIDGE BLVD\", \"APT 286, 2903 sprank\"]
			 * @example [
			 *       "7372 PARKRIDGE BLVD",
			 *       "APT 286"
			 *     ]
			 */
			streetLinesToken?: string[];
			/**
			 * @description This is resolved city name.<br> Example: IRVING
			 * @example IRVING
			 */
			city?: string;
			/**
			 * @description This is resolved state or province code.<br>Example: TX<br><a onclick='loadDocReference("canadaprovincecodes")'>Click here to see State Or Province Code</a>
			 * @example TX
			 */
			stateOrProvinceCode?: string;
			/**
			 * @description This is resolved ISO alpha 2 country code.<br>Example: US<br><a onclick='loadDocReference("countrycodes")'>Click here to see Country Codes</a>
			 * @example US
			 */
			countryCode?: string;
			/** @description Returns messages pertaining to the resolved address indicating if any additional information is required.<br><br>Following are informational code and messages with respect to the results:<ul><li><i>INVALID.SUITE.NUMBER</i> &ndash; Invalid or missing Apartment/Suite</li><li><i>SUITE.NUMBER.REQUIRED</i> &ndash; Invalid or missing Apartment/Suite</li><li><i>PARTIAL.STREET.MATCH</i> &ndash; A street address is required for delivery. The entered address is a street number range.</li><li><i>MISSING.OR.AMBIGUOUS.DIRECTIONAL</i> &ndash; Invalid or missing address directional.</li><li><i>INTERPOLATED.STREET.ADDRESS</i> &ndash; Unable to confirm exact street number for the entered street name. The address falls within a valid range for the street name.</li><li><i>RRHC.CONVERSION</i> &ndash; A street address is required for delivery. The address has been converted from a rural route.</li></ul> */
			customerMessage?: components["schemas"]["CustomerMessage"][];
			/**
			 * @description This is the resolved city name with a token. The token is an indication to the changes made.<br> Examples: [TOK-1X3256]
			 * @example [
			 *       "TOK-1X3256"
			 *     ]
			 */
			cityToken?: components["schemas"]["ResolutionToken"][];
			/** @description This is the resolved postal code with a token. The token is an indication to the changes made. */
			postalCodeToken?: components["schemas"]["ResolutionToken"];
			parsedPostalCode?: components["schemas"]["ParsedPostalCode"];
			/**
			 * @description This is the classification type of a FedEx address.<br>Valid values:<ul><li>BUSINESS</li><li>RESIDENTIAL</li><li>MIXED (If it is a multi-tenant based address and contains both business and residential units.)</li><li>UNKNOWN (If just a zip code is provided, Address Validation Service returns 'unknown' for the business/residential classification.)</li>
			 * @example BUSINESS
			 * @enum {string}
			 */
			classification?: "MIXED" | "UNKNOWN" | "BUSINESS" | "RESIDENTIAL";
			/**
			 * @description Indicates if the resolved address is a P.O. Box.
			 * @example true
			 */
			postOfficeBox?: boolean;
			/**
			 * @description Indicates the presence of a delivery point such as a mailbox. Provided only for US addresses that are standardized against Postal Data.
			 * @example true
			 */
			normalizedStatusNameDPV?: boolean;
			/**
			 * @description Indicates the source from which the standardized address is matched. <br> Example: Postal or Map.
			 * @example Postal
			 */
			standardizedStatusNameMatchSource?: string;
			/**
			 * @description Indicates the resolution method used to resolve the address. <br>Valid values: <ul><li>USPS_VALIDATE</li><li>CA_VALIDATE</li><li>GENERIC_VALIDATE</li><li>NAVTEQ_GEO_VALIDATE</li><li>TELEATLAS_GEO_VALIDATE</li></ul>
			 * @example USPS_VALIDATE
			 */
			resolutionMethodName?: string;
			/**
			 * @description Indicates if the resolved address is a Rural Route or Highway Contract (US only). It returns true if it is rural route.
			 * @example false
			 */
			ruralRouteHighwayContract?: boolean;
			/**
			 * @description Indicates the mail service is for those without permanent address. The mails for this address are held at a post office. Only applies to addresses that can be standardized against Postal Data. Not provided for US Geo Validated addresses. <br>Note: Only returned when the address cannot be resolved.
			 * @example false
			 */
			generalDelivery?: boolean;
			/** @description These are the  key-value pair as additional information returned along with the address processed by the system. These attribute will list what is working and what is not on the input address. For More information, look in to Chapter Address Attributes in the Overview.<br><a onclick='loadDocReference("addressattributes")'>Click here to see Address Attributes</a> */
			attributes?: {
				/**
				 * @description true indicates the input address is a POBox.
				 * @example false
				 */
				POBox?: boolean;
				/**
				 * @description True indicates a POBox only postal code.
				 * @example false
				 */
				POBoxOnlyZIP?: boolean;
				/**
				 * @description True indicates when the address comes under a new ZIP code that did not exists previously.
				 * @example false
				 */
				SplitZip?: boolean;
				/**
				 * @description True indicates the resolved address includes a suite number, but it was missing in the request.
				 * @example false
				 */
				SuiteRequiredButMissing?: boolean;
				/**
				 * @description True indicates an invalid suite number.
				 * @example false
				 */
				InvalidSuiteNumber?: boolean;
				/**
				 * @description Type of input information (Currently only option is RAW_ADDRESS).
				 * @example RAW_ADDRESS
				 */
				ResolutionInput?: string;
				/**
				 * @description True indicates the postal delivery address is valid delivery point.
				 * @example false
				 */
				DPV?: boolean;
				/**
				 * @description Indicates the type of resolution method utilized to resolve the address.  Valid Values:  USPS_VALIDATE (US postal), NAVTEQ_GEO_VALIDATE or RELEATLAS_GEO_VALIDATED (US geo/map validated), CA_VALIDATE (Canada postal), GENERIC_VALIADTE (other validation).
				 * @example GENERIC_VALIDATE
				 */
				ResolutionMethod?: string;
				/**
				 * @description Month and year of the reference data that was used to identify the address.
				 * @example July 2020
				 */
				DataVintage?: string;
				/**
				 * @description Indicates 'Postal' or 'Map' date was used to match the address.
				 * @example Postal
				 */
				MatchSource?: string;
				/**
				 * @description True indicates the country is supported by the Address Validation service.
				 * @example true
				 */
				CountrySupported?: boolean;
				/**
				 * @description True indicates the address is in a valid format.
				 * @example true
				 */
				ValidlyFormed?: boolean;
				/**
				 * @description True indicates the address matches to a record in the address validation repository.
				 * @example true
				 */
				Matched?: boolean;
				/**
				 * @description True indicates the address was successfully resolved.
				 * @example true
				 */
				Resolved?: boolean;
				/**
				 * @description True indicates the address was inserted into the Address data repository.
				 * @example false
				 */
				Inserted?: boolean;
				/**
				 * @description True indicates that an input address was resolved to a standardized address for the base address of a multi-unit building. False indicates that the address was not resolved to a standardized address for the base address of a multi-unit building.
				 * @example false
				 */
				MultiUnitBase?: boolean;
				/**
				 * @description True indicates the input address was resolved to a standardized address based upon a Zip-11 postal code match. This is the highest level of postal code validation.
				 * @example false
				 */
				ZIP11Match?: boolean;
				/**
				 * @description True indicates that the input address was resolved to a standardized address based upon at least a ZIP+4 match, for example 80003-5581.
				 * @example false
				 */
				ZIP4Match?: boolean;
				/**
				 * @description True indicates that the postal code of the address is unique for a specific postal customer address. The ZIP may apply to a single unit or floor within a building, to an entire building, or to an institution or corporate campus.
				 * @example false
				 */
				UniqueZIP?: boolean;
				/**
				 * @description True indicates that the house number and street name were validated against reference data.
				 * @example false
				 */
				StreetAddress?: boolean;
				/**
				 * @description True indicates a Rural Route conversion was applied to the address in order to process it.
				 * @example false
				 */
				RRConversion?: boolean;
				/**
				 * @description True indicates address contains multiple units.
				 * @example false
				 */
				ValidMultiUnit?: boolean;
				/**
				 * @description valid values:<br>RAW - address country not supported.<br>NORMALIZED - address country supported, but unable to match the address against reference data.<br>STANDARDIZED - address service was able to successfully match the address against reference data.
				 * @example STANDARDIZED
				 */
				AddressType?: string;
				/**
				 * @description Indicates the depth/precision of the address.  MULTI_TENANT_UNIT indicates that the address has valid secondary information.<br>MULTI_TENANT_BASE indicates that the address is a valid multi tentant location but secondary information either was not provided or could not be validated.<br>PO_BOX indicates that the local postal authority services the address through a PO Box.<br>UNIQUE_ZIP indicates that the address could be validated to the postal code level and that postal code is a unique zip for the USPS.<br>STREET_ADDRESS / Street indicates that the location is not a valid multi tenant location.<br>StreetBuilding indicates that the address was validated to a building name that is in the reference data.<br>StreetOrganization indicates that the address was validated to an organization name that is in the reference data.<br>StreetName indicates that the address was validated to the street name level in reference data and the house number (if provided) could not be validated.valid values:<br>MULTI_TENANT_UNIT- address consists of multiple units, some could be BUSINESS, some could be MIXED.
				 * @example MULTI_TENANT_UNIT
				 */
				AddressPrecision?: string;
				/**
				 * @description True indicates the address requested has multiple matches available, usually due to a simPle difference such as a leading directional.
				 * @example false
				 */
				MultipleMatches?: boolean;
			};
		};
		ParsedPersonName: {
			/**
			 * @description First Name <br>Example: Edwin
			 * @example Edwin
			 */
			firstName: string;
			/**
			 * @description Middle Name <br>Example: Thomas
			 * @example Thomas
			 */
			middleName?: string;
			/**
			 * @description Last Name <br>Example: Luies
			 * @example Luies
			 */
			lastName: string;
			/**
			 * @description Suffix <br>Example: Jr
			 * @example Jr
			 */
			suffix?: string;
		};
		/** @description EMailDetail Model */
		EMailDetail: {
			/**
			 * @description Format Type of email notification
			 * @example TEXT
			 * @enum {string}
			 */
			emailNotificationFormatType?: "SMS_TEXT_MESSAGE" | "TEXT" | "HTML";
			/**
			 * @description Email address of the user
			 * @example genny.john15@fedex.com
			 */
			address?: string;
			/**
			 * @description Email Permission Type
			 * @example DENY
			 * @enum {string}
			 */
			permissions?: "GRANT" | "DENY";
		};
		/** @description SocialMediaDetail Model */
		SocialMediaDetail: {
			/**
			 * @description Specifies additional attributes about this contact.
			 * @example None
			 */
			attributes?: string;
			/**
			 * @description Specifies Platform Id
			 * @example GFDE/55
			 */
			platformId?: string;
		};
		/** @description PhoneNumberDetail Model */
		PhoneNumberDetail: {
			/** @description Phone Number details of the user */
			number: components["schemas"]["PhoneNumber"];
			/**
			 * @description Shows the Phone Permission Status
			 * @example GRANT/DENY
			 * @enum {string}
			 */
			permissions: "GRANT" | "DENY";
			/**
			 * @description Specifies the Phone Usage
			 * @example PRIMARY
			 * @enum {string}
			 */
			usage: "PRIMARY" | "SECONDARY";
			/**
			 * @description Phone Number Type
			 * @example FAX/WORK
			 * @enum {string}
			 */
			type?: "FAX" | "HOME" | "MOBILE" | "PAGER" | "WORK";
			/**
			 * @description Phone Notification Format Type
			 * @example SMS_TEXT_MESSAGE
			 * @enum {string}
			 */
			phoneNotificationFormatType?: "SMS_TEXT_MESSAGE";
		};
		/** @description PhoneNumber Model */
		PhoneNumber: {
			/**
			 * @description Area-Code of given area
			 * @example 987
			 */
			areaCode: string;
			/**
			 * @description Extension of the phone number
			 * @example 1234
			 */
			extension?: string;
			/**
			 * @description The two-letter code used to identify a country.
			 * @example 91
			 */
			countryCode: string;
			/**
			 * @description Personal Identification Number
			 * @example 8575
			 */
			personalIdentificationNumber?: string;
			/**
			 * @description Local Number of the person
			 * @example 9879878
			 */
			localNumber: string;
		};
		/** @description CompanyName Model */
		CompanyName: {
			/**
			 * @description Division of the company
			 * @example ICE
			 */
			division?: string;
			/**
			 * @description Unique company code for the company
			 * @example W1097
			 */
			companyCd?: string;
			/**
			 * @description Name of the company
			 * @example FedEx
			 */
			name: string;
			/**
			 * @description Departments of the company
			 * @example FedEx Services
			 */
			department?: string;
			/**
			 * @description storeId for the company
			 * @example 15FFGT5
			 */
			storeId?: string;
		};
		/** @description Returns messages pertaining to the resolved address indicating if any additional information is required. */
		CustomerMessage: unknown;
		/** @description Specifies the resolved attribute with a token indicating if it was changed or not. */
		ResolutionToken: {
			/**
			 * @description Indicates if it has changed from the input address.
			 * @example false
			 */
			changed?: boolean;
			/**
			 * @description Indicates the changed value.<br> Example: SAN JUAN
			 * @example SAN JUAN
			 */
			value?: string;
		};
		/** @description The postal code specified in a form that is supported by USPS as base, secondary and tertiary.<ul><li>Base</li><li>AddOn</li><li>DeliveryPoint</li></ul>Example: 75063-8659 */
		ParsedPostalCode: {
			/**
			 * @description Indicates the base.<br> Example: 00926
			 * @example 00926
			 */
			base?: string;
			/**
			 * @description Indicates the secondary value in Postal Code.<br> Example: 2716
			 * @example 2716
			 */
			addOn?: string;
			/**
			 * @description Indicates the tertiary value in Postal Code.<br> Example: 50
			 * @example 50
			 */
			deliveryPoint?: string;
		};
		/** @description Specifies the API alerts. */
		Alert: {
			/**
			 * @description Indicates the API alert code.
			 * @example SHIP.RECIPIENT.POSTALCITY.MISMATCH
			 */
			code?: string;
			/**
			 * @description Indicates the API alert message.
			 * @example Recipient Postal-City Mismatch.
			 */
			message?: string;
			/**
			 * @description Indicates the API alert type.
			 * @example NOTE
			 * @enum {string}
			 */
			alertType?: "NOTE" | "WARNING";
		};
		ErrorResponseVO: {
			/**
			 * @description Unique identifier returned in the reply and helps you match the request to the reply.<br>Example: XXX_ORDERXXXX789
			 * @example bc95c0e4-b33e-42a2-80d2-334282b5d37a
			 */
			transactionId?: string;
			/**
			 * @description This element allows you to assign a unique identifier to your transaction. This element is also returned in the reply and helps you match the request to the reply. <br> Example: AnyCo_order123456789
			 * @example AnyCo_order123456789
			 */
			customerTransactionId?: string;
			/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files, directories and user accounts. This includes code, message and parameters. */
			errors?: components["schemas"]["CXSError"][];
		};
		/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files , directories and user accounts. This includes code, message and parameter */
		CXSError: {
			/** @description Indicates the error code.<br>Example: STANDARDIZED.ADDRESS.NOTFOUND */
			code?: string;
			parameterList?: components["schemas"]["Parameter"][];
			/** @description Indicates the description of API error alert message.<br>Example: Standardized address is not found. */
			message?: string;
		};
		/** @description List of parameters which indicates the properties of the alert message. */
		Parameter: {
			/** @description Identifies the error option to be applied. */
			value?: string;
			/** @description Indicates the value associated with the key. */
			key?: string;
		};
		ErrorResponseVO401: {
			/**
			 * @description The transaction ID is a special set of numbers that defines each transaction.<br>Example: 624deea6-b709-470c-8c39-4b5511281492
			 * @example 624deea6-b709-470c-8c39-4b5511281492
			 */
			transactionId?: string;
			/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files, directories and user accounts. This includes code, message and parameters. */
			errors?: components["schemas"]["CXSError401"][];
		};
		/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files , directories and user accounts. This includes code, message and parameter */
		CXSError401: {
			/** @description Indicates the error code.<br>Example: NOT.AUTHORIZED.ERROR */
			code?: string;
			/** @description Specifies list of parameters. */
			parameterList?: components["schemas"]["Parameter"][];
			/** @description Indicates the description of API error alert message.<br>Example: Access token expired. Please modify your request and try again. */
			message?: unknown;
		};
		ErrorResponseVO403: {
			/**
			 * @description The transaction ID is a special set of numbers that defines each transaction.<br>Example: 624deea6-b709-470c-8c39-4b5511281492
			 * @example 624deea6-b709-470c-8c39-4b5511281492
			 */
			transactionId?: string;
			/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files, directories and user accounts. This includes code, message and parameters. */
			errors?: components["schemas"]["CXSError403"][];
		};
		/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files , directories and user accounts. This includes code, message and parameter */
		CXSError403: {
			/** @description Indicates the error code.<br>Example: FORBIDDEN.ERROR */
			code?: string;
			/** @description Specifies list of parameters. */
			parameterList?: components["schemas"]["Parameter"][];
			/** @description Indicates the description of API error alert message.<br>Example: We could not authorize your credentials. Please check your permissions and try again */
			message?: unknown;
		};
		ErrorResponseVO404: {
			/**
			 * @description The transaction ID is a special set of numbers that defines each transaction.<br>Example: 624deea6-b709-470c-8c39-4b5511281492
			 * @example 624deea6-b709-470c-8c39-4b5511281492
			 */
			transactionId?: string;
			/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files, directories and user accounts. This includes code, message and parameters. */
			errors?: components["schemas"]["CXSError404"][];
		};
		/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files , directories and user accounts. This includes code, message and parameter */
		CXSError404: {
			/** @description Indicates the error code.<br>Example: NOT.FOUND.ERROR */
			code?: string;
			/** @description Specifies list of parameters. */
			parameterList?: components["schemas"]["Parameter"][];
			/** @description Indicates the description of API error alert message.<br>Example: The resource you requested is no longer available. Please modify your request and try again. */
			message?: unknown;
		};
		ErrorResponseVO500: {
			/**
			 * @description The transaction ID is a special set of numbers that defines each transaction.<br>Example: 624deea6-b709-470c-8c39-4b5511281492
			 * @example 624deea6-b709-470c-8c39-4b5511281492
			 */
			transactionId?: string;
			/**
			 * @description This element allows you to assign a unique identifier to your transaction. This element is also returned in the reply and helps you match the request to the reply. <br> Example: AnyCo_order123456789
			 * @example AnyCo_order123456789
			 */
			customerTransactionId?: string;
			/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files, directories and user accounts. This includes code, message and parameters. */
			errors?: components["schemas"]["CXSError500"][];
		};
		/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files , directories and user accounts. This includes code, message and parameter */
		CXSError500: {
			/** @description Indicates the error code.<br>Example: INTERNAL.SERVER.ERROR */
			code?: string;
			/** @description Specifies list of parameters. */
			parameterList?: components["schemas"]["Parameter"][];
			/** @description Indicates the description of API error alert message.<br>Example: We encountered an unexpected error and are working to resolve the issue. We apologize for any inconvenience. Please check back at a later time. */
			message?: unknown;
		};
		ErrorResponseVO503: {
			/**
			 * @description The transaction ID is a special set of numbers that defines each transaction.<br>Example: 624deea6-b709-470c-8c39-4b5511281492
			 * @example 624deea6-b709-470c-8c39-4b5511281492
			 */
			transactionId?: string;
			/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files , directories and user accounts. This includes code, message and parameter */
			errors?: components["schemas"]["CXSError503"][];
		};
		/** @description Indicates error alert when suspicious files, potential exploits and viruses found while scanning files , directories and user accounts. This includes code, message and parameter */
		CXSError503: {
			/** @description Indicates the error code.<br>Example: SERVICE.UNAVAILABLE.ERROR */
			code?: string;
			/** @description Indicates error parameters includes parameter key/value pairs. */
			parameterList?: components["schemas"]["Parameter"][];
			/** @description Indicates the description of API error alert message.<br>Example: The service is currently unavailable and we are working to resolve the issue. We apologize for any inconvenience. Please check back at a later time. */
			message?: unknown;
		};
		/** @description The request elements for address resolution. */
		Full_Schema_Validate_Address: {
			/**
			 * @description This can be used to request the characteristics of an address had at a particular time in history. This defaults to current date time (of the Address Validation System). This is useful because the AddressValidation database is dynamic and stores historical data. Characteristics such as Business/Residential indicator may change over time.<br> Example: 2019-09-06
			 * @example 2019-09-06
			 */
			inEffectAsOfTimestamp?: string;
			validateAddressControlParameters?: components["schemas"]["AddressResolutionControlParameters"];
			/** @description Indicate the address to be validated and resolved. This includes the address details, such as streetline, state or province code, country code and postal code. <br><br><i>Note: Up to 100 of these can be submitted in a single request.</i> */
			addressesToValidate: components["schemas"]["ResolveContactAndAddress"][];
		};
		/** @description Specify the parameters applied to validate the address. */
		AddressResolutionControlParameters: {
			/**
			 * @description Use this to request detailed information of the address components once the validation is complete. The details specify the changes made to each address component to resolve the address.
			 * @example true
			 */
			includeResolutionTokens?: boolean;
		};
		/** @description Specifies the address details of a location. */
		ResolveContactAndAddress: {
			address: components["schemas"]["Address"];
			/**
			 * @description Client Reference Id
			 * @example None
			 */
			clientReferenceId?: string;
		};
		/** @description This is the Address in detail to be resolved. */
		Address: {
			/**
			 * @description Indicate the combination of number, street name. etc. <br>Example: ["7372 PARKRIDGE BLVD", "APT 286, 2903 sprank"].<br><br>Note:<ul><li>At least one line is required for a valid physical address; empty lines should not be included.</li><li>Maximum up to three lines & no error check if entered more than this limit.</li><li>Recommended limit per line is 35 characters.</li></ul>
			 * @example [
			 *       "7372 PARKRIDGE BLVD",
			 *       "APT 286",
			 *       "2903 sprank"
			 *     ]
			 */
			streetLines: string[];
			/**
			 * @description Indicate the name of city, town, etc.<br><br>Note: City is mandatory, When postalcode is not provided and includeResolutionTokens value is true in the request.
			 * @example IRVING
			 */
			city: string;
			/**
			 * @description Indicate the State or Province codes. The Format and presence of this field may vary depending on the country.<br>Example: TX<br><a onclick='loadDocReference("canadaprovincecodes")'> Click here to see State Or Province Code</a>. Maximum length is 2
			 * @example TX
			 */
			stateOrProvinceCode?: unknown;
			/**
			 * @description Indicate the Postal Code which is an identification code of a region (usually small) for easier and accurate mail/package delivery. The format and presence of this field may vary depending on the country.<br> Example: 75063-8659<br><a onclick='loadDocReference("postalawarecountries")'>Click here to see Postal Code</a>
			 * @example 75063-8659
			 */
			postalCode: unknown;
			/**
			 * @description Specify the ISO Alpha2 code of the country.<br>Example: US <br><a onclick='loadDocReference("countrycodes")'>Click here to see Country Codes</a>
			 * @example US
			 */
			countryCode?: string;
		};
		/** @example {
		 *       "addressesToValidate": [
		 *         {
		 *           "address": {
		 *             "streetLines": [
		 *               "Toronto City Hall 100 Queen St W"
		 *             ],
		 *             "city": "Toranto",
		 *             "stateOrProvinceCode": "ON",
		 *             "postalCode": "M5H2N1",
		 *             "countryCode": "CA"
		 *           }
		 *         }
		 *       ]
		 *     } */
		Address_Validation_Canada: unknown;
		/** @example {
		 *       "addressesToValidate": [
		 *         {
		 *           "address": {
		 *             "streetLines": [
		 *               "7372 PARKRIDGE BLVD",
		 *               "APT 286"
		 *             ],
		 *             "city": "IRVING",
		 *             "stateOrProvinceCode": "TX",
		 *             "postalCode": "75063-8659",
		 *             "countryCode": "US"
		 *           }
		 *         }
		 *       ]
		 *     } */
		Address_Validation_US: unknown;
		/** @example {
		 *       "addressesToValidate": [
		 *         {
		 *           "address": {
		 *             "streetLines": [
		 *               "Adam-von-Trott-Straße 1"
		 *             ],
		 *             "city": "Berlin",
		 *             "stateOrProvinceCode": "",
		 *             "postalCode": "13627",
		 *             "countryCode": "DE"
		 *           }
		 *         }
		 *       ]
		 *     } */
		Address_Validation_for_Germany: unknown;
		/** @example {
		 *       "addressesToValidate": [
		 *         {
		 *           "address": {
		 *             "streetLines": [
		 *               "Via Vittorio Veneto, 121"
		 *             ],
		 *             "city": "Roma",
		 *             "postalCode": 187,
		 *             "countryCode": "IT"
		 *           }
		 *         }
		 *       ]
		 *     } */
		Address_Validation_for_Italy: unknown;
		/** @example {
		 *       "addressesToValidate": [
		 *         {
		 *           "address": {
		 *             "streetLines": [
		 *               "24 Grosvenor Square"
		 *             ],
		 *             "city": "London",
		 *             "postalCode": "W1A 2LQ",
		 *             "countryCode": "GB"
		 *           }
		 *         }
		 *       ]
		 *     } */
		Address_Validation_for_UK: unknown;
		body:
			| components["schemas"]["Full_Schema_Validate_Address"]
			| components["schemas"]["Address_Validation_Canada"]
			| components["schemas"]["Address_Validation_US"]
			| components["schemas"]["Address_Validation_for_Germany"]
			| components["schemas"]["Address_Validation_for_Italy"]
			| components["schemas"]["Address_Validation_for_UK"];
	};
	responses: never;
	parameters: never;
	requestBodies: never;
	headers: never;
	pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
	"Validate Address": {
		parameters: {
			query?: never;
			header: {
				/** @description This element allows you to assign a unique identifier to your transaction. This element is also returned in the reply and helps you match the request to the reply. */
				"x-customer-transaction-id"?: string;
				/** @description This is used to indicate the media type of the resource. The media type is a string sent along with the file indicating format of the file. */
				"content-type": string;
				/** @description This indicates the combination of language code and country code.  <a onclick='loadDocReference("locales")'>Click here to see Locales</a> */
				"x-locale"?: string;
				/** @description This indicates the authorization token for the input request. */
				authorization: string;
			};
			path?: never;
			cookie?: never;
		};
		requestBody?: {
			content: {
				"application/json": components["schemas"]["body"];
			};
		};
		responses: {
			/** @description Success */
			200: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["AdvcResponseVO"];
				};
			};
			/** @description Bad Request */
			400: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorResponseVO"];
				};
			};
			/** @description Unauthorized */
			401: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorResponseVO401"];
				};
			};
			/** @description Forbidden */
			403: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorResponseVO403"];
				};
			};
			/** @description Not Found */
			404: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorResponseVO404"];
				};
			};
			/** @description Failure */
			500: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorResponseVO500"];
				};
			};
			/** @description Service Unavailable */
			503: {
				headers: {
					[name: string]: unknown;
				};
				content: {
					"application/json": components["schemas"]["ErrorResponseVO503"];
				};
			};
		};
	};
}
