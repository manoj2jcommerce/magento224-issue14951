# Magento 2.2.4 Fix for Issue #14951
This module works only with Magento 2.2.4 version and need to be removed after upgrade/downgrade. Assumed that the issue will be fixed in the new release.

This is a temporary fix for the Issue [Issue #11354](https://github.com/magento/magento2/issues/14951) 
## 1. How to install module

Run the following command in Magento 2 root folder:

```
composer require sashas/magento224-issue14951
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento setup:static-content:deploy
```

## 2. How to uninstall module

Run the following command in Magento 2 root folder:

```
composer remove sashas/magento224-issue14951
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento setup:static-content:deploy
```