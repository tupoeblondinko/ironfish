/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import * as yup from 'yup'
import { ApiNamespace, router } from '../router'

export type GetNetworkInfoRequest = undefined
export type GetNetworkInfoResponse = {
  networkId: number
}

export const GetNetworkInfoRequestSchema: yup.MixedSchema<GetNetworkInfoRequest> = yup
  .mixed()
  .oneOf([undefined] as const)

export const GetNetworkInfoResponseSchema: yup.ObjectSchema<GetNetworkInfoResponse> = yup
  .object({
    networkId: yup.number().defined(),
  })
  .defined()

router.register<typeof GetNetworkInfoRequestSchema, GetNetworkInfoResponse>(
  `${ApiNamespace.chain}/getNetworkInfo`,
  GetNetworkInfoRequestSchema,
  (request, node): void => {
    request.end({
      networkId: node.internal.get('networkId'),
    })
  },
)
