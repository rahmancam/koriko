
[![CI](https://img.shields.io/github/workflow/status/rahmancam/koriko/Koriko%20CI?label=tests)](https://github.com/rahmancam/koriko/actions)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Netlify Status](https://api.netlify.com/api/v1/badges/7d060efd-872d-4984-8f41-1f512d325f6b/deploy-status)](https://app.netlify.com/sites/koriko/deploys)
[![license](https://img.shields.io/github/license/rahmancam/koriko)](https://github.com/rahmancam/koriko/blob/main/LICENSE)

# Koriko

Koriko is a courier service library to estimate cost and time to deliver the packages. This library is very customizable, and can add custom estimation pipeline to the existing API.

## How it looks

<img src='./static/img/koriko-web-demo.gif'>

## Getting Started

- Check out the <a href="https://rahmancam.github.io/koriko/" target="_blank">documentation</a>
- Try the <a href="https://koriko.netlify.app" target="_blank">live demo</a> as mentioned above

## What kind of problems it solves

So if you have a courier service and wants to

* estimate cost of the package along with coupon/offers configuraion
* estimate delivery time of the package along with cost, coupon/offers and fleet configurations

## Features

* estimateCost API to estimate cost along with coupon configuration.
* custom estimattor can be added via API (Ex. deduct tax along with totalCost of delivery)
* estimateTime API to allocate shipping/ and fleet
* custom package allocation/ maximzation strategy (default maximizeByNumberOfPackages)
* API can be consumed by any Javascript client/ server (can expose as REST API as well)

## Project Setup

### Installation

This is a [Node.js](https://nodejs.org/en/) library and application

Before installing, [download and install latest Node.js](https://nodejs.org/en/download/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install
```

### Console App

To run the console application,

#### Usecase 1 (estimateCost)
```bash
$ npm start ./__testinputs__/use_case_1.txt
```
<img src='./static/img/usecase_1_console.png'>

#### Usecase 2 (estimateTime)
```bash
$ npm start ./__testinputs__/use_case_2.txt
```
<img src='./static/img/usecase_2_console.png'>

You can place your input test files in `__testinputs__` directory and run with your filename.

```bash
$ npm start ./__testinputs__/<file-name>.txt
```

## API Usage

### estimateCost

```js
import { makeDeliveryEstimator } from '../../lib'

const estimator = makeDeliveryEstimator({ baseCost, coupons, settings })
const packagesWithCost = estimator.estimateCost(packages)

console.table(packagesWithCost)

```
### estimateTime

```js
import { makeDeliveryEstimator } from '../../lib'

const estimator = makeDeliveryEstimator({ baseCost, coupons, settings })
const shipments = estimator.estimateTime(packages, fleetDetail)

console.table(packagesWithCost)

```
## Approach to solve the problem
* composable functional programming style followed. Ex. customDeductTax(applyCoupon(estimateCost()))
* 0 / 1 knapsack algorithm is used to solve the maximization problem (with Dynamic programming approach) 
* custom package allocation/ maximzation strategy is customizable (default maximizeByNumberOfPackages)
* Priority Queue is implemented for fleet allocation