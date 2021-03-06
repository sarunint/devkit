/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Path, dasherize } from '@angular-devkit/core';
import {
  Rule,
  apply,
  mergeWith,
  move,
  partitionApplyMerge,
  template,
  url,
} from '@angular-devkit/schematics';
import { Schema } from './schema';


export default function (options: Schema): Rule {
  return mergeWith(apply(url('./files'), [
    partitionApplyMerge(
      (p: Path) => !/\/src\/.*?\/files\//.test(p),
      template({
        ...options as object,
        dot: '.',
        dasherize,
      }),
    ),
    move(options.name),
  ]));
}
